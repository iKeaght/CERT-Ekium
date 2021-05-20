<template>
  <panel title="Softwares">
<v-simple-table fixed-header height="600px" width="5000px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="cvss in cvss_list " :key="cvss.key" class="black--text">
        <td> {{cvss.cve}} </td>
        <td> {{cvss.severity}} </td>
        <td> {{cvss.description}} </td>
        <td> {{cvss.published_date}} </td>
        <td> {{cvss.last_modified_date}} </td>

      </tr>
    </tbody>
  </template>
</v-simple-table>
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
      cvss_list: []
 }
  },
  methods: {
  },
  async mounted() {
    try {
    this.cvss_list = (await CvssService.index({})).data
    console.log(this.cvss_list)
    } catch (err) {
    }
  }
}
</script>

<style>
</style>
