<template>
  <v-container>
    <v-layout row wrap justify-space-between>
      <v-flex xs3>
        <v-card>
           <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
            Participants</v-card-title>
            <template v-for="(participant, index) in participants">
              <v-card-text :key="index">
                {{participant.lolname}}
              </v-card-text>
            </template>
        </v-card>
      </v-flex>
      <v-flex xs5 px-2>
        <v-card>
           <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
            Rules for {{this.tournament.name}}</v-card-title>
            <v-card-text>
              These are the rules:
            </v-card-text>
            <v-card-text>
              Bracket will be finalized at 19.30 CEST. The Tournament starts shortly after. You will be invited to custom games either by Lancemenot himself or one of the tournament moderators.
            </v-card-text>
            <v-card-text>
              The Winner gets 1580 RP. You Win a matchup by killing your opponent, destroying their tower, reaching 100 cs first or having the most cs at 10 minutes. Can't pick the same champion twice in one tournament. Ornn and snowball aren't allowed, other than that anything goes.
            </v-card-text>
            <v-layout justify-center>
            <v-card-actions>
              <v-btn :href="tournament.url" class="primary">
                To Bracket
              </v-btn>
            </v-card-actions>
            </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
          Register</v-card-title>
          <v-card-text>
            <v-container>
              <v-layout column>
                <v-text-field
                  :rules="[rules.required]"
                  label="Summoner name"
                  v-model="lolname"
                  placeholder="Your Summonername">
                </v-text-field>
                <v-tooltip top>
                  <v-text-field
                    :rules="[rules.required]"
                    slot='activator'
                    label="Twitch name"
                    v-model="twitchname"
                    placeholder="Your name on Twitch.tv">
                  </v-text-field>
                  <span>We check if you actually follow lance with this.</span>
                </v-tooltip>
                <v-layout justify-end>
                  <v-btn
                    class="deep-purple darken-2 white--text"
                    @click="register">
                    Register for Tournament
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TournamentService from '@/services/TournamentService';

export default {
  name: 'TournamentCreation',
  data() {
    return {
      participants: null,
      tournament: null,
      lolname: '',
      twitchname: '',
      message: null,
      errors: null,
      rules: {
          required: value => !!value || 'Required.',
        }
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
        const response = await TournamentService.addParticipant(this.$route.params.url, { lolname: this.lolname, twitchname: this.twitchname });
        this.message = response.data.message;
        this.error = null;
      } catch (error) {
        console.log(error);
        this.errors = error.response.data.errors;
        this.message = null;
      }
    },
  },
  async mounted() {
    const response = await TournamentService.show(this.$route.params.url);
    const response2 = await TournamentService.participants(this.$route.params.url);
    this.tournament = response.data.tournament;
    this.participants = response2.data.participants;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
