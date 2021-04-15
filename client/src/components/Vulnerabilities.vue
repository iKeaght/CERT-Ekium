<template>
  <panel title="Vulnerabilities">
      <v-btn class="cyan accent-2"
   slot="action"
   router to="/vulnerability/add"
        light
        medium
        absolute
        right
        middle
        fab>
        <v-icon
        >add</v-icon>
      </v-btn>
    <div v-for="vulne in vulnerabilities" :key="vulne.id" class="black--text">
        <v-layout>
            <v-flex xs6>
                <div class="song-index">
 Vulnerability n°{{ vulne.id }} :
                </div>
            </v-flex>
            <v-flex xs6>
                <div class="song-title">
 {{ vulne.title }}
                </div>
                <v-btn dark class="cyan" :to="{ name: 'vulnerabilityId', params: { vulnerabilityId: vulne.id}}">
More
                </v-btn>
                <v-btn dark class="cyan" :to="{ name: 'vulnerabilityEdit', params:{vulnerabilityId: vulne.id}}">Edit</v-btn>
            </v-flex>
        </v-layout>
     
    </div>
  </panel>
</template>

<script>
import VulnerabilitiesService from '@/services/VulnerabilitiesService'
import Panel from "@/components/Panel";
export default {
  components: {
    Panel,
  },
  data() {
    return {
      vulnerabilities: [],
    };
  },
  async mounted(){
      this.vulnerabilities = (await VulnerabilitiesService.index()).data

  },
};
</script>

<style>
</style>