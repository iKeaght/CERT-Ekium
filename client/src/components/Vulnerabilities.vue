<template>
  <panel title="Vulnerabilities">
      <v-btn class="cyan accent-2"
   slot="action"
   router to="/vulnerabilities/add"
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
                <v-btn dark class="cyan" @click="navigateTo({name: 'vulnerability', params: {vulnerabilityId: vulne.id}})">
More
                </v-btn>
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
  methods:{
      navigateTo(route){
          this.$router.push(route)
      }
  }
};
</script>

<style>
</style>