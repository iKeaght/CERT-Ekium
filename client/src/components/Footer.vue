<template>
<div>
  <v-card  >
  <v-footer >
  <div>
    <h4> Documents </h4>
    <a  href="https://fr.calameo.com/read/0061403055e12c787eb75" style="color: #626262; text-decoration: underline;">Activity report - Ekium 2019</a> <br>
    <a href="https://www.ekium.eu/wp-content/uploads/2020/03/ekium_charte_responsabilite_societale_des_entreprises.pdf" style="color: #626262; text-decoration: underline;">RSE CHART</a> <br>
    <a  href="http://www.ekium.eu/wp-content/uploads/2021/03/Cv-2021-Ekium-une-societe-du-Groupe-SNEF_web.pdf" style="color: #626262; text-decoration: underline;">CV EKIUM</a> <br>
    </div>
    <v-spacer></v-spacer>
     <div>
       <v-toolbar-title class="mr-4">
        <v-avatar :tile="true" >
        <img
          :src="require('@/assets/logoEkium.png')"
          alt="logo"
          max-height="40"
          max-width="40"
        />
      </v-avatar>
      <span class="#7A7A7A"> 2021 - Ekium</span>
    </v-toolbar-title>
     <br><br>
    <span class="#7A7A7A"> All rights reserved - Ekium</span>
     <br> <br>
     </div>
     <v-spacer></v-spacer>
    <div>
      <h3>Join us on social networks</h3>
      <br>
    <v-avatar @click="goToExternalPage_Youtube()">
    <img
          :src="require('@/assets/Youtube_logo_black.png')"
          alt="logo"
          max-height="40"
          max-width="40"
        /></v-avatar>
        <v-avatar @click="goToExternalPage_Linkedin()">
    <img
          :src="require('@/assets/Linkedin_logo_black.png')"
          alt="logo"
          max-height="40"
          max-width="40"
        /></v-avatar>
    </div>
  </v-footer>
  </v-card>
</div>
  </template>

<script>
export default {
methods: {
    goToExternalPage_Ekium() {
      window.open('http://www.ekium.eu', '_blank')
      },
    goToExternalPage_Linkedin() {
      window.open('https://fr.linkedin.com/company/ekium', '_blank')
      },

    goToExternalPage_Youtube() {
      window.open('https://www.youtube.com/user/GroupeEkium', '_blank')
      }
}
}
</script>
<style scoped>
</style>
