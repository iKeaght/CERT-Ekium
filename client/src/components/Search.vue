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
      <v-text-field label="Search" filled v-model="search" v-on:keyup.enter="getApi()"></v-text-field>

      <v-btn outlined right router @click="getApi()"
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
    <slot v-if="!searching && !loading && !error">
      <v-simple-table fixed-header height="600px" widtd="5000px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-center">Vulnerability n°</th>
              <th class="text-left text-center">Description</th>
              <th class="text-right text-center"> Last Modified </th>
              <th class="text-right text-center">Release Date</th>
              <th class="text-right text-center">Severity</th>
              <th class="text-right text-center width: 15px">URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in dataApiCert.CVE_Items" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
                {{
                  service.cve.description.description_data.__ob__.value[0].value
                }}
              </td>
              <td>{{ service.lastModifiedDate | subStr }}</td>
              <td>{{ service.publishedDate | subStr }}</td>
              <td v-if="service.hasOwnProperty('impact')">
                {{ service.impact.baseMetricV2.severity }}
                <img :src="require('@/assets/low.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'LOW' ">
                <img :src="require('@/assets/high.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'HIGH' ">
                <img :src="require('@/assets/medium.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'MEDIUM' ">
                <img :src="require('@/assets/critical.png')" alt="low" height="40" width="40" v-if= "service.impact.baseMetricV2.severity === 'CRITICAL' ">
              </td>
              <td v-else>{{ NoDataAvailable }}</td>
              <td
                style="text-align: center"
                v-if="checkproperty(service, 'cve.references.reference_data')"
              >
                <a @click="goToExternalPage_CVE(service)"> <v-icon> open_in_new </v-icon> </a>
              </td>
              <td v-else>{{ NoDataAvailable }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </slot>
     <!-- footer display arrow-->
    <slot name="footer" v-if="!loading && !searching && !error">

      <v-btn outlined @click="previousPage()"
        >{{leftIndex}}<v-icon>chevron_left</v-icon></v-btn
      >

      <v-btn outlined @click="nextPage()">{{rightIndex}}<v-icon>chevron_right</v-icon></v-btn>
       <div outline  >Results :{{totalResults}}</div>
    </slot>
  </panel>
</template>
<script>
import Panel from '@/components/Panel'

export default {
  data() {
    return {
      search: '',
      title: 'Find a vulnerability',
      searching: true,
      loading: false,
      dataApiCert: {},
      NoDataAvailable: 'No Data Found',
      error: false,
      startIndex: 0,
      leftIndex: 0,
      rightIndex: 100,
      resultsPerPage: 100,
      totalResults: 0
    }
  },

  components: { Panel },

  methods: {
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
      this.searching = false
      this.loading = true
      try {
        const url = `https://services.nvd.nist.gov/rest/json/cves/1.0/?keyword=${this.search}&startIndex=${this.startIndex}&resultsPerPage=${this.resultsPerPage}&modStartDate=2020-01-01T00:00:00:000 UTC-05:00&orderDir=desc`
        this.title = this.search
        const res = await fetch(url, myInit)
        const results = await res.json()
        this.totalResults = results.totalResults
        this.dataApiCert = results.result

        console.log('dataApiCert :', this.dataApiCert)
        this.test = true
        this.loading = false
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
