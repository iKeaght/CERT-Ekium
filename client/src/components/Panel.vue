<template>
  <v-app>
    <v-card class="mx-auto" min-width="500" min-height="200">
      <v-card-title class="cyan justify-center" >{{title}} <slot name="action"/></v-card-title>
      <v-card-text class="pl-4 pr-4 pt-2 pb-2">
        <slot>
            No slot content defined
        </slot>
        
      </v-card-text>
      <slot name="footer"></slot>
    </v-card>
  </v-app>
</template>

<script>
export default {
    
    props:[
        'title'
    ],
    

}
</script>

<style>

</style>