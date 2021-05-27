<template>
  <panel title= 'Search'>
    <v-btn
      slot="action"
      light
      class="grey darken-1"
      small
      absolute
      left
      middle
      router
      to="/home"
      ><v-icon>arrow_back</v-icon></v-btn>
       <slot v-if="searchingstate">
      <v-text-field label= 'Search' filled v-model="param.keyword" v-on:keyup.enter="search_2()"></v-text-field>

      <v-btn outlined right router @click="search_2()"
        ><v-icon>search</v-icon></v-btn> </slot>
    <!--loading display-->
      <slot v-if="loading && !searchingstate">
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

      <slot v-if="(totalresults === 0 )">
        <div>
          <v-alert color="red" elevation="24" type="error"
            ><v-row align="center">
              <v-col class="grow">
                No results found with : {{ this.param.keyword }}
              </v-col>
              <v-col class="shrink">
                <v-btn to="/home">Go back</v-btn>
              </v-col>
            </v-row></v-alert
          >
        </div>
      </slot>
<v-simple-table fixed-header height="600px" width="5000px" v-if="!loading && !searchingstate && totalresults !== 0">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">N°</th>
        <th class="text-left text-center">CVE-ID</th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Severity </v-expansion-panel-header> <v-expansion-panel-content>
                 <h4 @click="changeseverity('')">    All     </h4> <br>
                 <h4 @click="changeseverity('LOW')">    Low     </h4> <br>
                 <h4 @click="changeseverity('MEDIUM')">    Medium     </h4> <br>
                 <h4 @click="changeseverity('HIGH')">    High     </h4> <br>
                 </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
        <th class="text-left text-center">Description</th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Publication Date</v-expansion-panel-header> <v-expansion-panel-content>
                <h4 @click="last3months()">    Last 3 months     </h4> <br>
                <h4 @click="lastyear()">    Last year     </h4> <br>
                <h4 @click="alltimes()">    All times     </h4> <br>

                 </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
        <th class="text-left text-center"> URL</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="(cvss, index) in cvss_list " :key="cvss.key" class="black--text">
        <td> {{index + 1}} </td>
        <td> {{cvss.cve}} </td>
        <td> {{cvss.severity}} <br>
        <img :src="require('@/assets/low.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'LOW       '">
        <img :src="require('@/assets/high.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'HIGH      '">
        <img :src="require('@/assets/medium.png')" alt="low" height="40" width="40" v-if= "cvss.severity === 'MEDIUM    '">
        </td>
        <td> {{cvss.description}} </td>
        <td> {{cvss.published_date}} </td>
        <td> <a @click="goToExternalPage_CVE(cvss.cve)"> <v-icon> open_in_new </v-icon> </a> </td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
      <slot name="footer" v-if="!loading && !loading2" && !searchingstate>
      <v-btn outlined @click="More()" v-if= "  index < totalresults"> more <br> <v-icon> more_horiz</v-icon></v-btn
        >
       <div outline v-if="!searchingstate" >Results :{{totalresults}}</div>
      </slot>
      <slot v-if="loading2">
      <v-container style="height: 20">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="subtitle-1 text-center" cols="12">
            Getting your data
          </v-col>
          <v-col cols="6">
          <v-progress-circular
        :size="30"
        color="#2C9DBD"
        indeterminate
      ></v-progress-circular>
          </v-col>
        </v-row> </v-container
    ></slot>
  </panel>
</template>
<script>
import CvssService from '@/services/CvssService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data() {
    return {
      searchingstate: true,
      totalresults: null,
      searchtext: '',
      loading: false,
      loading2: false,
      index: 25,
      cvss_list: [],
      keyword: {
        name: null
      },
      constadd: 25,
      pubyear: 0,
      pubmonth: 3,
      param: {
        keyword: '',
        order: 'published_date',
        publication_date: this.currentDate(),
        offset: 0,
        limit: 25,
        severity: ''
        }
 }
  },
  methods: {
    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear() - 1}-${current.getMonth() + 1}-${current.getDate()}`
      return date
    },
    async search() {
    try {
    this.searchingstate = false
    const param = this.param
    this.cvss_list = (await CvssService.index({param})).data
    this.totalresults = (await CvssService.count({param})).data.length
    this.loading = false
    this.loading2 = false
    } catch (err) {
    }
    },
    async search_2() {
      this.loading = true
      this.search()
    },
    goToExternalPage_CVE(url) {
      window.open(`https://nvd.nist.gov/vuln/detail/${url}`, '_blank')
    },
    changeseverity(severity) {
      this.loading = true
      this.param.severity = severity
      this.search()
    },
    last3months() {
      this.loading = true
      const current = new Date()
      this.param.publication_date = `${current.getFullYear()}-${current.getMonth() - 2}-${current.getDate()}`
      this.search()
    },
    alltimes() {
      this.loading = true
      const current = new Date()
      this.param.publication_date = `${current.getFullYear() - 23}-${current.getMonth() + 1}-${current.getDate()}`
      this.search()
    },
    lastyear() {
      this.loading = true
      const current = new Date()
      this.param.publication_date = `${current.getFullYear() - 1}-${current.getMonth() + 1}-${current.getDate()}`
      this.search()
    },
    More() {
      this.loading2 = true
      this.param.limit = this.param.limit + this.constadd
      this.index = this.index + this.constadd
      this.search()
    }
  },
  async mounted() {
  }
}
</script>

<style>
</style>
