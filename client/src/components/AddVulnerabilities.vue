<template>
  <v-container fluid>
    <br> <br>

<v-combobox
          outlined
          clearable
          v-model="vulnerability.title"
          :items="items"
          label="Select the vulnerabilities you want to add, press ENTER to create another"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              clearable
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
    <br> <br> <br> <br><br> <br> <br> <br><br> <br> <br> <br>
    <div>
    <v-btn dark class="grey darken-1" @click="createVulnerabilities(vulnerability.title)">Add Vulnerabilities</v-btn>
    </div>
  </v-container>
</template>

<script>
import VulnerabilitiesService from '@/services/VulnerabilitiesService'
  export default {
    data () {
      return {
      vulnerability: {
          title: null
      },
        items: [
          'Vmware',
          'Windows server'
        ]
      }
    },
    methods: {
    createVulnerabilities(title) {
      this.error = null
      console.log('test', title)
      for (var i = 0; i < title.length; i++) {
        this.vulnerability.title = title[i]
        VulnerabilitiesService.post(this.vulnerability)
      }
      this.$router.push({
      name: 'vulnerabilities'
      })
    }
  }
       }
</script>
