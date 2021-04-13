<template>
  <v-app>
    <v-card class="mx-auto" width="374">
      <v-card-title class="cyan">Register</v-card-title>
      <v-card-text>
        <form name="cert-form-register" autocomplete="off">
          <v-text-field
            name="email"
            label="Email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            name="password"
            type="password"
            label="Password"
            v-model="password"
          ></v-text-field>
        </form>
      
      <div class="error2" v-html="error" />
      <br />
      <v-btn class="cyan" @click="register"> Register</v-btn>
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
    async register() {
      try {
        const response = await AuthentificationService.register({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
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
