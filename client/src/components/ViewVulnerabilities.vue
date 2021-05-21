<template>
  <panel :title="keyword.name">
    <v-btn
      slot="action"
      light
      class="grey darken-1"
      small
      absolute
      left
      middle
      router
      to="/keywords"
      ><v-icon>arrow_back</v-icon></v-btn>
      <slot v-if="loading">
      <v-container style="height: 400px">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="subtitle-1 text-center" cols="12">
            Getting your data
          </v-col>
          <v-col cols="6">
          <v-progress-circular
        :size="100"
        color="#2C9DBD"
        indeterminate
      ></v-progress-circular>
          </v-col>
        </v-row> </v-container
    ></slot>
<v-simple-table fixed-header height="600px" width="5000px" v-if="!loading">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">CVE-ID</th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Severity </v-expansion-panel-header> <v-expansion-panel-content>
                 <h4 @click="changeseverity('alltimes')">    All     </h4> <br>
                 <h4 @click="changeseverity('alltimes')">    Low     </h4> <br>
                 <h4 @click="changeseverity('alltimes')">    Medium     </h4> <br>
                 <h4 @click="changeseverity('alltimes')">    High     </h4> <br>
                 </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
        <th class="text-left text-center">Description</th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Publication Date</v-expansion-panel-header> <v-expansion-panel-content>
                <h4 @click="changepublisheddate('alltimes')">    All times     </h4> <br>
                 </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Last Modified </v-expansion-panel-header> <v-expansion-panel-content>
                <h4 @click="changemodifdate('alltimes')">    All times     </h4> <br>
                 </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
        <th class="text-left text-center"> URL</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="cvss in cvss_list " :key="cvss.key" class="black--text">
        <td> {{cvss.cve}} </td>
        <td> {{cvss.severity}}
        <img :src="require('@/assets/low.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'LOW       '">
        <img :src="require('@/assets/high.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'HIGH      '">
        <img :src="require('@/assets/medium.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'MEDIUM    '">
        </td>
        <td> {{cvss.description}} </td>
        <td> {{cvss.published_date}} </td>
        <td> {{cvss.last_modified_date}} </td>
        <td> <a @click="goToExternalPage_CVE(cvss.cve)"> <v-icon> open_in_new </v-icon> </a> </td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
      <slot name="footer" v-if="!loading">
       <div outline  >Results :{{totalresults}}</div>
      </slot>
  </panel>
</template>

<script>
import CvssService from '@/services/CvssService'
import KeywordService from '@/services/KeywordService'

import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data() {
    return {
      loading: true,
      cvss_list: [],
      keyword: {
        name: null
      },
      param: {
        keyword: '',
        order: 'published_date',
        publication_date: '2019-01-01',
        offset: 10,
        limit: 10,
        severity: 'HIGH'
        }
 }
  },
  methods: {
    async search() {
          try {
    const KeywordId = this.$store.state.route.params.KeywordId
    const Keyword = (
      await KeywordService.show(KeywordId)
    ).data
    this.param.keyword = Keyword.name
    // this.param.order = ...
    // this.param.offset = ...
    // this.param.order = ...
    const param = this.param
    this.cvss_list = (await CvssService.index({param})).data
    this.loading = false
    this.totalresults = this.cvss_list.length
    } catch (err) {
    }
    },
    goToExternalPage_CVE(url) {
      window.open(`https://nvd.nist.gov/vuln/detail/${url}`, '_blank')
    }
  },

  async mounted() {
    try {
    const KeywordId = this.$store.state.route.params.KeywordId
    const Keyword = (
      await KeywordService.show(KeywordId)
    ).data
    this.keyword = Keyword
    this.search()
    } catch (err) {
    }
  }
}
</script>

<style>
</style>
