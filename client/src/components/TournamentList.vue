<template>
  <v-container>
    <v-layout column justify-space-between align-center>
      <v-list two-line subheader>
            <v-subheader>Tournaments</v-subheader>
            <template v-for="(tourney, index) in tournaments">
              <v-list-tile :key="index" avatar ripple>
                <v-layout row xs12 wrap>
                  <v-flex xs5 :href="tourney.url">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ tourney.name }}</v-list-tile-title>
                      <v-list-tile-sub-title :href="tourney.url">
                        <a class="" :href="tourney.url">
                        {{tourney.url}}
                        </a>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-flex>
                  <v-flex xs4>
                    <v-btn
                    :disabled="!tourney.registration"
                    :to="{
                      name: 'register',
                      params: {url: tourney.short_url}
                      }">
                      To Register Page
                    </v-btn>
                  </v-flex>
                  <v-flex xs3>
                    <v-switch
                      :disabled="!$store.state.isUserLoggedIn"
                      v-model="tourney.registration"
                      @change="updateTourney(tourney)"
                      label="Enable Registration"/>
                  </v-flex>
                </v-layout>
              </v-list-tile>
              <v-divider
               v-if="index + 1 < tournaments.length"
               :key="`divider-${index}`">
              </v-divider>
            </template>
      </v-list>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        class="primary" to="/tournament/create">Create a new Tourney</v-btn>
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
      api_url: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    updateTourney(tourney) {
      TournamentService.update(tourney.short_url, {
        registration: tourney.registration,
        name: tourney.name,
      });
    },
  },
  async mounted() {
    console.log(process.env.VUE_APP_API_URL);
    const response = await TournamentService.list({
      offset: 0,
      limit: 10,
    });
    this.tournaments = response.data.tournaments;
    this.tournaments.forEach((tourney) => {
      // eslint-disable-next-line
      tourney.short_url = tourney.url.replace(/.*?:\/\/.*?\//, ''); 
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
  color: grey;
}
</style>
