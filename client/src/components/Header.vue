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
      <span class="home" @click="navigateTo({ name: 'root' })">CERT Ekium</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark router to="register">
        Sign Up
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark router to="login">
        LOGIN
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: rgb(238, 208, 153);
}
</style>
