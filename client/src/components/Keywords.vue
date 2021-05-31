<template>
  <panel title="Softwares">
    <v-btn
      slot="action"
      class="grey darken-1"
      light
      small
      outlined
      absolute
      right
      middle
      router
      to="/keyword/add"
    >
      <v-icon>add</v-icon>
    </v-btn>
<v-simple-table fixed-header height="600px" width="5000px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">Name</th>
        <th class="text-left text-center">View</th>
        <th class="text-right text-center">Edit</th>
        <th class="text-right text-center">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="kw in keyword " :key="kw.name"  class="black--text">
        <td>{{ kw.name }}</td>
        <td> <v-btn
            light
            color="white"
            :to="{
              name: 'KeywordId',
              params: { KeywordId: kw.id },
            }"
          ><v-icon color="#2C9DBD">remove_red_eye</v-icon>
           </v-btn></td>
          <td><v-btn
            light
            color="white"
            :to="{
              name: 'KeywordEdit',
              params: { KeywordId: kw.id },
            }"
            ><v-icon color="#2C9DBD">edit</v-icon></v-btn
          ></td>
          <td><v-btn
            light
            color="white"
            :to="{
              name: 'KeywordDelete',
              params: { KeywordId: kw.id },
            }"
            ><v-icon color="#2C9DBD">delete</v-icon></v-btn
          ></td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
  </panel>
</template>

<script>
import KeywordService from '@/services/KeywordService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data() {
    return {
      keyword: [],
      user_mail: this.$store.state.user.email,
          param: {
        user_mail: ''
    }
    }
  },
  methods: {
  },
  async mounted() {
    try {
    this.param.user_mail = this.$store.state.user.email
    const param = this.param
    this.keyword = (await KeywordService.index({param
    })).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
</style>
