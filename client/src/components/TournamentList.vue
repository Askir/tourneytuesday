<template>
  <div>
    <h1 class = "display-2 font-weight-black">Tournament List</h1>
    <li :key="tourney.id" v-for="tourney in tournaments">
      {{tourney.name}}
    </li>
  </div>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
