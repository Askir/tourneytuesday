<template>
  <div>
    <h1>Registration</h1>
    <div class="registration-form">
      <input
        type="text"
        name="twitchName"
        v-model="twitchName"
        placeholder="Your Twitch username" />
      <input
        type="text"
        name="lolName"
        v-model="lolName"
        placeholder="Your summoner name (must be on EUW)" />
      <button
        @click="register">
        Register for the current tournament
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TournamentCreation',
  data() {
    return {
      twitchName: '',
      lolName: '',
    };
  },
  methods: {
    async register() {
      console.log(`Registering user ${this.twitchName} with lolname ${this.lolName}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.registration-form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 100px;
  margin: auto;
}
</style>
