<template>
  <div>
      <h1>Register</h1>

      <input 
      type="email"
      name="email"
      v-model="email"
      placeholder="email"
      />
    <br>
      <input 
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
      />
      <br>
      <button
      @click="register">
      Register</button>
  </div>
</template>

<script>
import AuthentificationService from '@/services/AuthentificationService'
export default {
  data() {
    return {
        email: '',
        password: ''
    };
  },
  methods:{
      //ne pas oublier le catch and try sinon message d'erreur
      async register(){
          try{
         const response = await AuthentificationService.register({
              email: this.email,
              password : this.password
              
          })
          console.log(response.data);
          }
          catch(e){
              console.log(e);
          }
      }

      }
  
};
</script>

<style>
</style>