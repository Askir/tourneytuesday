const TournamentService = require('../services/TournamentService');
const { Tournament } = require('../models');

module.exports = {
  async create(req, res) {
    TournamentService.create({
      name: req.body.name,
      url: req.body.name,
    }).then(async (response) => {
      console.log(response.data.tournament);
      const tournament = await Tournament.create({
        name: response.data.tournament.name,
        url: response.data.tournament.full_challonge_url,
      });
      res.send({
        message: `successfully created tourney ${tournament.name}`,
      });
    }).catch((error) => {
      console.log(error);
      res.status(400).send({
        errors: error.response.data.errors,
      });
    });
  },
};
// 'something went wrong please try again or contact
// Askir (sgt_askir on twitch) if the error persists',
