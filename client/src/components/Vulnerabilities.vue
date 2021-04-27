<template>
  <panel title="Vulnerabilities">
    <v-btn
      slot="action"
      class="blue-dark-3"
      light
      small
      outlined
      absolute
      right
      middle
      router
      to="/vulnerability/add"
    >
      <v-icon>add</v-icon>
    </v-btn>
<v-simple-table fixed-header height="600px" width="5000px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">n°</th>
        <th class="text-left text-center">Name</th>
        <th class="text-left text-center">View</th>
        <th class="text-right text-center">Edit</th>
        <th class="text-right text-center">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="vulne in vulnerabilities" :key="vulne.id" class="black--text">
        <td>{{ vulne.id }}</td>
        <td>{{ vulne.title }}</td>
        <td> <v-btn
            dark
            class="cyan"
            :to="{
              name: 'vulnerabilityId',
              params: { vulnerabilityId: vulne.id },
            }"
          ><v-icon color="black">remove_red_eye</v-icon>
           </v-btn></td>
          <td><v-btn
            dark
            class="cyan"
            :to="{
              name: 'vulnerabilityEdit',
              params: { vulnerabilityId: vulne.id },
            }"
            ><v-icon color="black">edit</v-icon></v-btn
          ></td>
          <td><v-btn
            dark
            class="cyan"
            :to="{
              name: 'vulnerabilityDelete',
              params: { vulnerabilityId: vulne.id },
            }"
            ><v-icon color="black">delete</v-icon></v-btn
          ></td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
  </panel>
</template>

<script>
import VulnerabilitiesService from '@/services/VulnerabilitiesService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data() {
    return {
      vulnerabilities: []
    }
  },
  async mounted() {
    try {
    this.vulnerabilities = (await VulnerabilitiesService.index({
    })).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
</style>
