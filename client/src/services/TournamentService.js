import Api from '@/services/Api';

export default {
  create(data) {
    return Api().post('tournament/create', data);
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
  //  tournamentID: 1
  // }
};
