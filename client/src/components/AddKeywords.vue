<template>
  <v-container fluid>
    <br> <br>

<v-combobox
          outlined
          clearable
          v-model="keyword.name"
          :items="items"
          label="Select the softwares you want to add, press ENTER to create another"
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
    <br> <br> <br> <br><br> <br> <br> <br><br> <br> <br> <br>
    <div>
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
        items: [
          'Vmware',
          'Windows server'
        ]
      }
    },
    methods: {
    async createKeywords(title) {
      try {
        this.error = null
        if (title.length) {
          for (var i = 0; i < title.length; i++) {
            this.keyword.name = title[i]
            KeywordService.post(this.keyword)
          }
          this.$router.push({ name: 'Keywords' })
        } else {
          console.log('fill in the blanks')
        }
      } catch (error) {
        this.error = true
      }
    }
  }
       }
</script>
