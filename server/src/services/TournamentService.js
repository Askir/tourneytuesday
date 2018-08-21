const Api = require('./ChallongeApi');

module.exports = {
  create(data) {
    return Api().post('tournaments.json', {
      api_key: 'ZFZctWgjIXn6JhyUyzDy6XSnWoXlqxYh5LLgpaqm',
      tournament: data,
    });
  },
  // TournamentService.create({
  //   name: 'Tuesday1',
  //   url: 'KESEKSEATASDA',
  // });
  addParticipant(tournamentUrl, data) {
    return Api().post(`tournaments/${tournamentUrl}/participants.json`, {
      api_key: 'ZFZctWgjIXn6JhyUyzDy6XSnWoXlqxYh5LLgpaqm',
      participant: data,
    });
  },
};
