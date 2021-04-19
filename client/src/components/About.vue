<template>

  <panel title="About Page">
  <slot >
    <div>zaa</div> 
  <a window.open="('http://www.google.com','_blank')">Google</a>
  <a @click="goToExternalPage()">Google</a>
  </slot>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  components: { Panel },
  methods:{
    goToExternalPage(){
window.open('http://www.google.com',"_blank")
    }
  }

}
</script>

<style>

</style>