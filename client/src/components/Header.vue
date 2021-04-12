<template>
  <v-app-bar app>
      <v-toolbar fixed>
    <v-toolbar-title>CERT Ekium</v-toolbar-title>
    <!-- <v-toolbar-items>
      <v-btn flat>Browse</v-btn>
    </v-toolbar-items> -->
    <v-spacer></v-spacer>
     <v-toolbar-items>
      <v-btn flat>
          <router-link to="register"> Sign Up</router-link>
          </v-btn>
    </v-toolbar-items>
      </v-toolbar>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
</style>
