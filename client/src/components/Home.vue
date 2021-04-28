<template>
<div>

  <br>
  <br>
      <h1> Welcome to Ekium CERT </h1> <br>

<v-img :src="require('@/assets/Ekium_img.png')" alt="img_ekium" width="2100" > </v-img>
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
