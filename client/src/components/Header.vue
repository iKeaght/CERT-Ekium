<template>
  <v-app-bar fixed class="orange darken-2" dark app>
    <v-toolbar-title class="mr-4">
      <!-- <v-btn text dark router to='/'>CERT Ekium</v-btn> -->
      <v-avatar :tile="true">
        <img
          :src="require('@/assets/logoEkium.png')"
          alt="logo"
          max-height="40"
          max-width="40"
        />
      </v-avatar>
      <span class="home">CERT Ekium</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn  text dark router to="/vulnerabilities">
        Vulnerabilities
      </v-btn>
      <v-btn  text dark router to="/search">
        Search
      </v-btn>
      <v-btn  text dark router to="/about">
        About
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark router to="/login">
        Login
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark router to="/register">
        Sign Up
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        text
        dark
        router
        @click="logout"
      >
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
          name: 'vulnerabilities'
        })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: auto;
}

</style>
 <!--test git
