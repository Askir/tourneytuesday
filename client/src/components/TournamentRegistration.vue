<template>
  <v-container>
    <v-card>
    <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
      Register for Tournament</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout column justify-space-around>
          <v-text-field
            label="Summoner name"
            v-model="lolname"
            placeholder="Your Summonername">
          </v-text-field>
          <v-btn
            class="deep-purple darken-2 white--text"
            @click="register">
            Register for Tournament
          </v-btn>
          <v-alert
            v-model="display_error"
            dismissible
            type="warning">
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
      lolname: '',
      message: null,
      errors: null,
    };
  },
  computed: {
    display_error: function() {
      return !!this.errors;
    },
    display_message: function() {
      return !!this.message;
    },
  },
  methods: {
    async register() {
      try {
        console.log(this.lolname);
        const response = await TournamentService.addParticipant(this.$route.params.url, { lolname: this.lolname });
        this.message = response.data.message;
        this.error = null;
      } catch (error) {
        console.log(error);
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
