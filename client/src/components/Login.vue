<template>
<panel title="Login">
      <v-card-text>
        <v-text-field name="email" label="Email" v-model="email"></v-text-field>
        <v-text-field name="password" type="password" label="Password" v-model="password" v-on:keyup.enter="login()" ></v-text-field>
        <div class="error2" v-html="error" />
        <br />
        <v-btn class="white--text grey darken-1" @click="login"> Login</v-btn>
      </v-card-text>
</panel>
</template>

<script>
import AuthentificationService from '@/services/AuthentificationService'
import Panel from '@/components/Panel'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    // ne pas oublier le catch and try sinon message d'erreur
    async login() {
      try {
        const response = await AuthentificationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.token)
        this.$router.push({
          name: 'home'

        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
