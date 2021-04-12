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
      <div  class="error" v-html="error"/>
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
        password: '',
        error: null
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
          catch(error){
              this.error = error.response.data.error;
          }
      }

      }
  
};
</script>

<style scoped>
.error{ 
  color : red;
}
</style>