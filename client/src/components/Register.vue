<template>
<panel title="Register" >
      <v-card-text>
        <form name="cert-form-register" autocomplete="off">
          <v-text-field  name="firstname" label="First name" v-model="firstname" ></v-text-field>
          <v-text-field name="lastname" label="Last name" v-model="lastname"></v-text-field>
          <v-text-field  name="email" label="Email" v-model="email" ></v-text-field>
          <v-text-field name="password" type="password" label="Password" v-model="password"></v-text-field>
          <v-autocomplete :items="items"></v-autocomplete>
        </form>
      <div class="error2" v-html="error" />
      <br />
      <v-btn class="grey darken-1 white--text" @click="register"> Register</v-btn>
      </v-card-text>
</panel>
</template>
<script>
import AuthentificationService from '@/services/AuthentificationService'
import CompanyService from '@/services/CompanyService'

import Panel from '@/components/Panel'
export default {
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      admin: false,
      error: null,
      companylist: [],
      select: null,
      items: []

    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthentificationService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          admin: false
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
    async mounted() {
    try {
    this.companylist = (await CompanyService.index({})).data
    } catch (err) {
      }
      for (var i in this.companylist) {
        this.items[i] = this.companylist[i].name
     } console.log(this.items)
     return this.items
  },
  components: {
    Panel }
}
</script>
<style scoped>
</style>
