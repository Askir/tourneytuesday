const TournamentService = require('../services/TournamentService');
const { Tournament } = require('../models');

module.exports = {
  async show(req, res) {
    const tournament = await Tournament.findOne({ where: { url: `https://challonge.com/${req.params.url}` } });
    res.send({
      tournament,
    });
  },
  async index(req, res) {
    console.log(req.query);
    const tournaments = await Tournament.findAll({
      offset: req.query.offset,
      limit: req.query.limit,
    });
    res.send({
      tournaments,
    });
  },
  async create(req, res) {
    TournamentService.create({
      name: req.body.name,
      url: req.body.name,
    })
      .then(async (response) => {
        console.log(response.data.tournament);
        const tournament = await Tournament.create({
          name: response.data.tournament.name,
          url: response.data.tournament.full_challonge_url,
        });
        res.send({
          message: `successfully created tourney ${tournament.name}`,
        });
      })
      .catch((error) => {
        res.status(400).send({
          errors: error.response.data.errors,
        });
      });
  },
  async addUser(req, res) {
    // req.params.id
    try {
      const response = await TournamentService.addParticipant(req.params.url, {
        name: req.body.lolname,
      });
      res.send({
        message: `successfully added user ${response.data.participant.name}`,
      });
    } catch (error) {
      res.status(400).send({
        errors: error.response.data.errors,
      });
    }
  },
};
// 'something went wrong please try again or contact
// Askir (sgt_askir on twitch) if the error persists',
