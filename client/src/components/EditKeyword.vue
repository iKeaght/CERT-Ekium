<template>
  <div>
    <panel :title="'Edit ' + title">
      <v-text-field
        v-on:keyup.enter="savekeyword()"
        label="Title"
        type="text"
        autocomplete="off"
        required
        :rules="[required]"
        v-model="keyword.name"
      ></v-text-field>
      <div class="error2" v-html="error" v-if="error">{{error}}</div>
      <br>
      <v-btn dark class="grey darken-1" router to="/Keywords">Cancel</v-btn>
      <v-btn dark class="grey darken-1" @click="savekeyword">Save keyword</v-btn>

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
        title: null,
        hasbeenseen: false,
        user_email: this.$store.state.user.email
      },
      title: '',
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  components: {
    Panel
  },
  methods: {
    async savekeyword() {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.keyword).every(
        (key) => !!this.keyword[key]
      )
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in the required field'
        return
      }
      const KeywordId = this.$store.state.route.params.KeywordId
      try {
      await KeywordService.put(this.keyword)
      this.$router.push({
        name: 'Keywords', params: {KeywordId: KeywordId}
      })
      } catch (err) {
        console.log(err)
      }
    }

  },
  async mounted() {
    try {
      const KeywordId = this.$store.state.route.params.KeywordId
      this.keyword = (await KeywordService.show(KeywordId)).data
      this.title = (await KeywordService.show(KeywordId)).data.name
    } catch (err) {
      console.log(err)
    }
  }

}
</script>

<style>
</style>
