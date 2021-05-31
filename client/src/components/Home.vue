<template>
<div>
  <div v-if="isuseradmin"> <br>  <v-btn router to="admin"> You are connected as an administrator, press the button to access to administration page</v-btn> </div>
  <br>
  <br>
      <h1> Welcome to Ekium's CERT </h1> <br>
<v-img :src="require('@/assets/Ekium_img.png')" alt="img_ekium" width="2100" > </v-img>
<br> <br>
<v-divider  color="#2C9DBD"
  inset
></v-divider>
<br> <br>
<h3 class="black--text">This website allows you to see every vulnerabilities your service has. This is a CERT that uses NIST and their vulnerability database.</h3>
<br> <br>

<h1> What is a CERT ? </h1> <br> <br>

<h3 class="black--text font-weight-medium ">Nowadays, our computers are getting more and more attacked by cybercriminals, they use vulnerabilities on softwares to gain access to our private informations. That is why our CERT exists. </h3>
<br>
<h3 class="black--text font-weight-medium">A Computer Emergency Response Team (CERT) allows you to know how the software installed on your computer could be a vulnerability for your computer by using a large vulnerability database.</h3>
<br><br>
<h1> How does Ekium's CERT work ?</h1> <br> <br>
<h3 class="black--text font-weight-medium"> First, you'll have to login with your account (or register if you don't already have one) by using the LOGIN and SIGN UP buttons at the top right of your screen, then you'll be allowed to access your list of vulnerabilities and add some if you need to</h3>
<br> <br>
<h3 class="black--text font-weight-medium"> If you don't already have an account, you can also search vulnerabilities for different softwares by using the SEARCH button</h3>
<br> <br><br> <br>

</div>
</template>

<script>
export default {
  data() {
    return {
      isuseradmin: false
    }
  },
methods: {
},
  async mounted() {
    if (this.$store.state.isUserLoggedIn) {
      this.isuseradmin = this.$store.state.user.admin
      }
  }
  }

</script>

<style>

</style>
