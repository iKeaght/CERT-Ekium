<template>
  <v-app>
    <v-card class="mx-auto" width="374">
      <v-card-title class="cyan">Login</v-card-title>
      <v-card-text>
        <v-text-field name="email" label="Email" v-model="email"></v-text-field>
        <v-text-field
          name="password"
          type="password"
          label="Password"
          v-model="password"
        ></v-text-field>
        <div class="error2" v-html="error" />
        <br />
        <v-btn class="cyan" @click="login"> Login</v-btn>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import AuthentificationService from "@/services/AuthentificationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    // ne pas oublier le catch and try sinon message d'erreur
    async login() {
      try {
        const response = await AuthentificationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.token);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.error2 {
  color: red;
}
</style>
