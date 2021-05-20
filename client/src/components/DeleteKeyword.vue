<template>
  <div>
 <panel title= "Delete">
<v-btn
      slot="action"
      light
      class="grey darken-1"
      small
      absolute
      left
      middle
      router
      to="/Keywords"
      ><v-icon>arrow_back</v-icon></v-btn
    >
 <h4 class="text-center"> You will delete the following software :</h4>
    <br>
    <h2 class="text-center font-weight-black"> {{keyword.name}}</h2>
    <br>
    <v-btn dark class="grey darken-1" router to='/Keywords'>Cancel</v-btn>
    <v-btn dark class="grey darken-1" @click="deletekeyword()">Confirm</v-btn>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import KeywordService from '@/services/KeywordService'

export default {
  data() {
    return {
      keyword: {
        name: null
      },

      error: null,

      required: (value) => !!value || 'Required'
    }
  },

  components: {
    Panel
  },

  methods: {
    async deletekeyword() {
      await KeywordService.delete(this.keyword)
      this.$router.push({
        name: 'Keywords'
      })
    }
  },

  async mounted() {
    try {
      const KeywordId = this.$store.state.route.params.KeywordId

      this.keyword = (
        await KeywordService.show(KeywordId)
      ).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
</style>
