import Api from '@/services/Api';

export default {
  create(data) {
    return Api().post('tournaments', data);
  },
  // TournamentService.create({
  //   name: 'Tuesday1'
  // })
  register(data) {
    return Api().post('tournament/register', data);
  },
  // TournamentService.register({
  //  twitchName: 'sgt_askir',
  //  lolName: 'Askir',
  //  tournamentID: 1,
  // });
  list(data) {
    return Api().get('tournaments', data);
  },
  // TournamentService.list({
  //  offset: 1,
  //  limit: 2,
  // });
  addParticipant(url, data) {
    return Api().post(`tournament/${url}/user`, data);
  },
  // TournamentService.addParticipant('Askir1231231',{
  //  lolname: 'Askir',
  // });
  update(url, data) {
    return Api().post(`/tournament/${url}`, data);
  },
  // TournamentService.update('lancetourney', {
  //   registration: true,
  //   name: 'cookies',
  // });
  show(url) {
    return Api().get(`tournament/${url}`);
  },
};
