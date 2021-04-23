<template>
  <panel title="About us">
    <slot>
      <div>Find us on our networks by clicking on the pictures down below</div>
<a @click="goToExternalPage_Ekium()">
  <img :src="require('@/assets/Ekium-logo.png')" alt="logo_ekium" height="80" width="80">
</a>
  <a @click="goToExternalPage_Linkedin()">
  <img :src="require('@/assets/Linkedin_logo.png')" alt="logo_ekium" height="80" width="80">
</a>
<a @click="goToExternalPage_Youtube()">
  <img :src="require('@/assets/Youtube_logo.png')" alt="logo_ekium" height="80" width="80">
</a>
    </slot>
  </panel>
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
