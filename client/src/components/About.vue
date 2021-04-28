<template>
<div>

  <br>
  <br>
    <slot>
      <h1> About us </h1>

<br>
<img :src="require('@/assets/Ekium_img.png')" alt="img_ekium" width="2100" > <br><br><br>
<v-divider  color="#2C9DBD"
  inset
></v-divider>
<br>
<h1 justify >Ekium in brief</h1>
<br><br>
<h4 class= "black--text" > Ekium, the French leader in Engineering and automation works with process industries in project management, design, implementation and automation.</h4>

<br><br>

  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto"
      color="white"
      max-width="1000"
    >
    <h2 v-if="!hover" class= "blue--text"> Evolution of the workforce and turnover </h2>
    <h2 v-if="hover"  class= "blue--text"> Turnover extended by activity </h2>

      <v-img
        src="https://www.ekium.eu/wp-content/uploads/2020/07/Sch%C3%A9ma-chiffres-cl%C3%A9s-site-internet-anglais-1024x724.png"
      >
        <v-slide-y-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out white v-card--reveal display-1 black--text"
            style="height: 100%;"
          >
          <v-img
        src="https://www.ekium.eu/wp-content/uploads/2020/07/Chiffre-daffaire-march%C3%A9s-EN-2048x1448.png">
        </v-img>
          </div>

        </v-slide-y-transition>
      </v-img>
    </v-card>
  </v-hover>
  <br><br>
 <div>Find us on our networks by clicking on the pictures down below</div> <br>
<a @click="goToExternalPage_Ekium()">
  <img :src="require('@/assets/Ekium-logo.png')" alt="logo_ekium" height="100" width="100">
</a>
  <a @click="goToExternalPage_Linkedin()">
  <img :src="require('@/assets/Linkedin_logo.png')" alt="logo_ekium" height="100" width="100">
</a>
<a @click="goToExternalPage_Youtube()">
  <img :src="require('@/assets/Youtube_logo.png')" alt="logo_ekium" height="100" width="100">
</a>
<br><br><br><br>

    </slot>
    <v-divider color="#2C9DBD"
  inset
></v-divider>
  </div>
</template>

<script>
import Panel from '@/components/Panel.vue'
export default {
  components: { Panel },
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

<style>

</style>
