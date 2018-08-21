<template>
  <v-container>
    <v-layout column justify-space-between align-center>
      <v-list two-line subheader>
            <v-subheader>Tournaments</v-subheader>
            <template v-for="(tourney, index) in tournaments">
              <v-list-tile :href="tourney.url" :key="index" avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title>{{ tourney.name }}</v-list-tile-title>
                  <v-list-tile-sub-title :href="tourney.url">
                    {{tourney.url}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn 
                :to="{
                  name: 'register',
                  params: {url: tourney.short_url}
                  }">
                  To Register Page
                </v-btn>
              </v-list-tile>
              <v-divider v-if="index + 1 < tournaments.length" :key="`divider-${index}`"></v-divider>
            </template>
      </v-list>    
      <v-btn flat class="primary" to="/tournament/create">Create a new Tourney</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import TournamentService from '@/services/TournamentService';

export default {
  name: 'TournamentList',
  data() {
    return {
      tournaments: null,
    };
  },
  methods: {},
  async mounted() {
    const response = await TournamentService.list({
      offset:0,
      limit:10,
    });
    this.tournaments = response.data.tournaments;
    this.tournaments.forEach((tourney) => {
      tourney.short_url = tourney.url.replace(/.*?:\/\/.*?\//, '');
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
