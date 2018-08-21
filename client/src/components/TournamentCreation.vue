<template>
  <div>
    <v-card>
    <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
      Create new Tournament</v-card-title>
      <v-card-text>
        <v-text-field
          label="name"
          v-model="name"
          placeholder="Tournament Tuesday 28">
        </v-text-field>
        <v-btn
        class="deep-purple darken-2 white--text"
          @click="create">
          Create Tournament
        </v-btn>
        <v-alert
          v-model="display_error"
          dismissible
          type="warning">
          {{ error }}
          </v-alert>
        <v-alert
          v-model="display_message"
          dismissible
          type="success">
          {{ message }}
          </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TournamentService from '@/services/TournamentService';

export default {
  name: 'TournamentCreation',
  data() {
    return {
      name: '',
      display_message: false,
      display_error: false,
      message: null,
      error: null,
    };
  },
  methods: {
    async create() {
      try {
        const response = await TournamentService.create({
          name: this.name,
        });
        this.message = response.data.message;
        this.display_message = true;
        this.display_error = false;
        this.error = null;
      } catch (error) {
        const [firstError] = error.response.data.errors;
        this.display_message = false;
        this.error = firstError;
        this.display_error = true;
        this.message = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
