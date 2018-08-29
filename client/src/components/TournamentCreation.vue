<template>
  <v-container>
    <v-card>
    <v-card-title class="headline font-weight-regular primary white--text">
      Create new Tournament</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout column>
              <v-text-field
                label="Name"
                v-model="name"
                placeholder="Tournament Tuesday 28">
              </v-text-field>
              <v-text-field
                label="Challonge URL"
                v-model="url"
                placeholder="tournament_tuesday_28">
              </v-text-field>
              <v-layout justify-end>
                  <v-btn
                    class="primary white--text"
                    @click="create">
                    Create Tournament
                  </v-btn>
              </v-layout>
              <v-alert
                v-model="display_error"
                dismissible
                type="error">
                <ul>
                  <li v-for="error in errors" :key="error">
                    {{error}}
                  </li>
                </ul>
              </v-alert>
              <v-alert
                v-model="display_message"
                dismissible
                type="success">
                {{ message }}
              </v-alert>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import TournamentService from '@/services/TournamentService';

export default {
  name: 'TournamentCreation',
  data() {
    return {
      name: '',
      url: '',
      message: null,
      errors: null,
    };
  },
  computed: {
    display_error() {
      return !!this.errors;
    },
    display_message() {
      return !!this.message;
    },
  },
  methods: {
    async create() {
      try {
        const response = await TournamentService.create({
          name: this.name,
          url: this.url,
        });
        this.message = response.data.message;
        this.error = null;
      } catch (error) {
        this.errors = error.response.data.errors;
        this.message = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
