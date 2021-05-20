<template>
  <div>
    <panel title="keyword Metadata">
      <v-text-field
        v-on:keyup.enter="createkeyword()"
        label="Title"
        type="text"
        autocomplete="off"
        required
        :rules="[required]"
        v-model="keyword.name"
      ></v-text-field>
      <div class="error2" v-html="error" v-if="error">{{error}}</div>
      <br>
      <v-btn dark class="grey darken-1" router to="/keywords">Cancel</v-btn>
      <v-btn dark class="grey darken-1" @click="createkeyword()">Add keyword</v-btn>

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
        name: null,
        user_email: this.$store.state.user.email
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  components: {
    Panel
  },
  methods: {
    async createkeyword() {
        this.error = null
      const areAllFieldsFilledIn = Object.keys(this.keyword).every(
        (key) => !!this.keyword[key]
      )
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in the required field'
        return
      }
      try {
        await KeywordService.post(this.keyword)
        console.log(this.keyword)
        this.$router.push({
          name: 'keywords'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
