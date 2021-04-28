<template>
  <v-app>
    <v-card  class="grey lighten-5" min-width="500" min-height="250">
      <slot name="action"/> <v-toolbar-title class="grey darken-1 white--text" right-center >{{title}}</v-toolbar-title>
      <v-card-text class="pl-4 pr-4 pt-2 pb-2">
        <slot>
        </slot>
      </v-card-text>
      <slot name="footer"></slot>
    </v-card>
  </v-app>
</template>

<script>
export default {

    props: [
        'title'
    ]

}
</script>

<style>

</style>
