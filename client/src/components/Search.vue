<template>
  <panel :title= 'Search'>
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
       <slot>
      <v-text-field label= 'Search' filled v-model="search" v-on:keyup.enter="Search()"></v-text-field>

      <v-btn outlined right router @click="Search()"
        ><v-icon>search</v-icon></v-btn>
    </slot>
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
        <th class="text-left text-center">Severity</th>
        <th class="text-left text-center">Description</th>
        <th class="text-left text-center">Publication date</th>
        <th class="text-left text-center">Last modification date</th>

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
      loading: false,
      cvss_list: [],
      keyword: {
        name: null
      },
      search: ''
 }
  },
  methods: {
    async Search() {
      this.loading = true
          try {
    const Keywordname = this.search
    console.log(Keywordname)
    const Keyword = (
      await KeywordService.showwithname(Keywordname)
    ).data
    this.keyword = Keyword
    this.cvss_list = (await CvssService.index({Keyword})).data
    this.loading = false
    this.totalresults = this.cvss_list.length
    } catch (err) {
    }
    }
  }
}
</script>

<style>
</style>
