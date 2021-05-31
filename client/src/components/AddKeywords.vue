<template>
  <v-container fluid>
    <br> <br>
    <h2> Add popular softwares </h2>
    <v-simple-table fixed-header height="300px" width="2px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left text-center">Name</th>
        <th class="text-left text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="kw in keywordlist " :key="kw.name"  class="black--text">
        <td>{{kw.name }}</td>
        <td> <v-btn color="white" @click="createKeyword(kw.name)"> <v-icon color="#2C9DBD">add</v-icon></v-btn> </td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
<v-alert dense text type="success" v-if="keyword_popular.name !=='' && !error2"> Keyword <strong>{{keyword_popular.name}}</strong> has been added to your software list </v-alert>
<v-alert dense text type="error" v-if="keyword_popular.name !=='' && error2"> Keyword <strong>{{keyword_popular.name}}</strong> is already in your software list </v-alert>
    <br> <br>
    <h2> Add new softwares </h2>
    <br><br>
<v-combobox
          outlined
          clearable
          v-model="keyword.name"
          label="Enter the softwares you want to add, press ENTER to create another"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              clearable
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
    <div>
    <br>
    <div class="error2" v-if="error"> A problem has occured, you may not have entered any keyword</div>
    <v-btn dark class="grey darken-1" @click="createKeywords(keyword.name)">Add Softwares</v-btn>
    </div>
  </v-container>
</template>

<script>
import KeywordService from '@/services/KeywordService'
  export default {
    data () {
      return {
      error: false,

      keyword: {
          name: null,
          user_email: this.$store.state.user.email
      },
      keyword_popular: {
          name: '',
          user_email: this.$store.state.user.email
      },
      error2: false,
      param: {
        user_mail: ''
    },
    message: '',
        items: [],
        keywordlist: []
      }
    },
    methods: {
    async createKeywords(title) {
      try {
        if (title.length > 0) {
          for (var i = 0; i < title.length; i++) {
            this.keyword.name = title[i]
            try {
            KeywordService.post(this.keyword)
            } catch (error) {
      }
          }
          this.$router.push({ name: 'Keywords' })
        }
      } catch (error) {
        this.error = true
      }
    },
    createKeyword(name) {
      this.keyword_popular.user_email = this.$store.state.user.email
      this.keyword_popular.name = name
      try {
        KeywordService.post(this.keyword_popular)
      } catch (error) {
      }
    }
  },
    async mounted() {
    try {
    this.param.user_mail = this.$store.state.user.email
    const param = this.param
    this.keywordlist = (await KeywordService.index_add({param})).data
    } catch (err) {
    }
  }
  }
</script>
