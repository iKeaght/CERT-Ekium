<template>
  <div id="app">
    <v-app>
    <Header/>
    <main>
      <v-container fluid>
     <router-view/>
      </v-container>
    </main>
    </v-app>
    <Footer />
    </div>

</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c9dbd;
  margin-top: 60px;
}
.error2{
        color: red;
}
</style>
