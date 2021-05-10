<template>
  <panel :title="title">
    <v-btn
      slot="action"
      light
      small
      outlined
      absolute
      left
      middle
      router
      to="/home"
      ><v-icon>arrow_back</v-icon></v-btn>
    <!--searching display-->
    <slot v-if="searching">
      <v-text-field label="Search" filled v-model="search" v-on:keyup.enter="Search()"></v-text-field>

      <v-btn outlined right router @click="Search()"
        ><v-icon>search</v-icon></v-btn
      >
    </slot>

    <!--error display-->
    <slot
      v-if="
        (typeof dataApiCert === 'undefined' || dataApiCert == 'vide') && error
      "
    >
      <div>
        <v-alert color="red" elevation="24" type="error"
          ><v-row align="center">
            <v-col class="grow">
              No results found with : {{ this.search }}
            </v-col>
            <v-col>
              <v-btn class="dark-text" outlined @click="goBack()" to="/search"
                >Go back</v-btn
              >
            </v-col>
          </v-row></v-alert
        >
      </div>
    </slot>

    <!--Loading display-->
    <slot v-if="loading && !searching">
      <v-container style="height: 400px">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="subtitle-1 text-center" cols="12" focus>
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
    <!--searching display-->
      <slot v-if="!loading && !error && !searching">
        <v-simple-table fixed-header height="600px" withd="5000px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left text-center">Vulnerability id</th>
                <th class="text-left text-center">Description</th>
                <th>  <v-expansion-panels focusable > <v-expansion-panel > <v-expansion-panel-header  class="grey--text text-right text-center" > Last Modified </v-expansion-panel-header> <v-expansion-panel-content>
                <h4 @click="changemodifdate('last3months')" class="text--center"> Last 3 months  </h4> <br>
                <h4 @click="changemodifdate('last3years')">    Last 3 years     </h4> <br>
                <h4 @click="changemodifdate('alltimes')">    All times     </h4> <br>
                </v-expansion-panel-content> </v-expansion-panel> </v-expansion-panels> </th>
                <th>  <v-expansion-panels focusable text> <v-expansion-panel > <v-expansion-panel-header class="grey--text text-right text-center" > Severity </v-expansion-panel-header> <v-expansion-panel-content>
                <h4 @click="changeseverity('HIGH')">   HIGH    </h4>
                <h4 @click="changeseverity('MEDIUM')"> MEDIUM  </h4>
                <h4 @click="changeseverity('LOW')">    LOW     </h4>
                <h4 @click="changeseverity('ALL')">    ALL     </h4>
                 </v-expansion-panel-content>
    </v-expansion-panel> </v-expansion-panels> </th>
                <th class="text-right text-center width: 15px">URL</th> <br> <br> <br> <br>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(service, index) in dataApiCert.CVE_Items"
                :key="index"
                nbvulnerability = index
              >
                <td class="text-center">{{service.cve.CVE_data_meta.ID}}</td>
                <td class="text-center">
                  {{
                    service.cve.description.description_data.__ob__.value[0]
                      .value
                  }}
                </td>
                <td>{{ service.lastModifiedDate | subStr }}</td>
                <td v-if="checkproperty(service,'impact.baseMetricV2')">
                  {{ service.impact.baseMetricV2.severity}} <br>
                  <img :src="require('@/assets/low.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'LOW' ">
                  <img :src="require('@/assets/high.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'HIGH' ">
                  <img :src="require('@/assets/medium.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'MEDIUM' ">
                  <img :src="require('@/assets/critical.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'CRITICAL' ">
                <td v-else>{{ NoDataAvailable }}</td>
                <td
                  style="text-align: center"
                  v-if="checkproperty(service, 'cve.references.reference_data')"
                >
                <a @click="goToExternalPage_CVE(service)"> <v-icon> open_in_new </v-icon> </a>
                </td >
                <td v-else>{{ NoDataAvailable }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </slot>

      <!-- footer display arrow-->
      <slot name="footer" v-if="!loading && !error && !loading2 &&!searching">
      <v-btn outlined @click="More()" v-if= "nbvulnerability < totalResults "> more <br> <v-icon> more_horiz</v-icon></v-btn
        >
       <div outline  >Results :{{totalResults}}</div>
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
import Panel from '@/components/Panel'

export default {
  data() {
    return {
      search: '',
      loading2: false,
      title: 'Find a vulnerability',
      searching: true,
      loading: false,
      dataApiCert: {},
      NoDataAvailable: 'No Data Found',
      error: false,
      startIndex: 0,
      leftIndex: 0,
      rightIndex: 50,
      resultsPerPage: 25,
      constadd: 25,
      totalResults: 0,
      severityCVE: '',
      nbvulnerability: 25,
      modifdate: '2021-01-02T00:00:00:000 UTC-05:00'
    }
  },

  components: { Panel },

  methods: {
    Search() {
      this.searching = false
      this.loading = true
      this.getApi()
    },
    changeseverity(sev) {
      this.loading = true
      if (sev !== 'ALL') {
      this.severityCVE = sev
      this.getApi()
} else {
      this.severityCVE = ' '
      this.getApi()
      }
    },
    changemodifdate(date) {
      this.loading = true
      switch (date) {
        case 'last3months':
          this.modifdate = '2021-01-02T00:00:00:000 UTC-05:00'
          break
        case 'last3years':
          this.modifdate = '2019-05-01T00:00:00:000 UTC-05:00'
          break
        default:
          this.modifdate = '1990-01-01T00:00:00:000 UTC-05:00'
          break
      }
       this.getApi()
    },
    goToExternalPage_CVE(service) {
      window.open(`https://nvd.nist.gov/vuln/detail/${service.cve.CVE_data_meta.ID}`, '_blank')
    },
    async getApi() {
      var myHeaders = new Headers()

      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      }
      try {
        const url = `https://services.nvd.nist.gov/rest/json/cves/1.0/?keyword=${this.search}&resultsPerPage=${this.resultsPerPage}&modStartDate=${this.modifdate}&cvssV2Severity=${this.severityCVE}`
        this.title = this.search
        const res = await fetch(url, myInit)
        const results = await res.json()
        this.totalResults = results.totalResults
        this.dataApiCert = results.result

        console.log('dataApiCert :', this.dataApiCert)
        this.test = true
        this.loading = false
        this.loading2 = false
        if (typeof this.dataApiCert === 'undefined') {
          console.log('dataApiCert in if:', this.dataApiCert)
          this.dataApiCert = 'vide'
          this.error = true
        }
      } catch (err) {
        this.test = false
      }
    },
    mounted() {
      this.getApi()
    },
    goBack() {
      this.searching = true
      this.error = false
    },
     previousPage() {
      this.loading = true
      if (this.startIndex === 0) {
        return
      }
      this.leftIndex = this.leftIndex - 100
      this.rightIndex = this.rightIndex - 100
      this.startIndex = this.startIndex - 100

      this.getApi()
    },
    nextPage() {
      this.loading = true
      this.rightIndex = this.rightIndex + 100
      this.leftIndex = this.leftIndex + 100
      this.startIndex = this.startIndex + 100
      this.getApi()
    },
    goToExternalPage(service) {
      window.open(`${service.cve.references.reference_data[0].url}`, '_blank')
      console.log('refe', service.cve.references.reference_data[0])
    },
    checkproperty(object, path) {
      var current = object
      var components = path.split('.')
      for (var i = 0; i < components.length; i++) {
        if (
          typeof current !== 'object' ||
          !current.hasOwnProperty(components[i])
        ) {
          return false
        }
        current = current[components[i]]
      }
      return true
    },
    More() {
      this.loading2 = true
      this.resultsPerPage = this.resultsPerPage + this.constadd
      this.nbvulnerability = this.nbvulnerability + this.constadd
      this.getApi()
    }
  },

  filters: {
    subStr(value) {
      return (
        value.substring(8, 10) +
        '/' +
        value.substring(5, 7) +
        '/' +
        value.substring(0, 4)
      )
    }
  }
}
</script>
<style>
.urllink {
  color: blue;
}
.urllink:hover {
  cursor: pointer;
  text-decoration: underline;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
