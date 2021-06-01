<template>
<div >
<div v-if="isuseradmin"> <br> <br>
      <h1> Administration page </h1> <br>
<v-data-table
      :headers="headers"
      :items="user_list"
      item-key="email"
      class="elevation-1"
      cursor: pointer
    >
    </v-data-table> <br> <br><br> <br>
      <v-text-field
        label="Name"
        type="text"
        autocomplete="off"
        required
        :rules="[required]"
        v-model="company.name"
      ></v-text-field>
      <v-text-field
        v-on:keyup.enter="createcompany()"
        label="Belongs to"
        type="text"
        autocomplete="off"
        v-model="company.belongsto"
      ></v-text-field>
      <div class="error2" v-html="error" v-if="error">{{error}}</div>
      <br>
      <v-btn class="white--text" color="#2C9DBD" @click="createcompany()">Add company</v-btn>
</div>
<div v-if="!isuseradmin"> <br> <br>
      <h1> You have no right to access this page </h1> <br>
<v-divider  color="#2C9DBD"
></v-divider>
</div>
</div>

</template>

<script>
import AuthentificationService from '@/services/AuthentificationService'
import CompanyService from '@/services/CompanyService'

export default {
  data() {
    return {
      isuseradmin: Boolean,
      user_list: [],
      company: {
        name: '',
        belongsto: ' '
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
},
computed: {
      headers () {
        return [
          { text: 'Email Adress',
            value: 'email',
            align: 'start',
            filter: value => {
              if (!this.email) return true
              return value < parseInt(this.email)
            }
          },
          { text: 'First name', value: 'firstname' },
          { text: 'Last Name', value: 'lastname' },
          { text: 'Admin', value: 'admin' },
          { text: 'Company', value: 'company' }
        ]
      }
    },
methods: {
    async createcompany() {
        this.error = null
      const areAllFieldsFilledIn = Object.keys(this.company).every(
        (key) => !!this.company[key]
      )
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in the required field'
        return
      }
      try {
        await CompanyService.post(this.company)
        this.company.name = ' '
        this.company.belongsto = ' '
      } catch (err) {
        console.log(err)
      }
    }
},
  async mounted() {
    if (this.$store.state.isUserLoggedIn) {
      this.isuseradmin = this.$store.state.user.admin
      }
    this.user_list = (await AuthentificationService.index({})).data
  }
}

</script>

<style>

</style>
