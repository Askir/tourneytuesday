const TournamentService = require('../services/TournamentService');
const FollowerService = require('../services/FollowerService');
const { Tournament, Participant } = require('../models');

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
  async update(req, res) {
    try {
      const tournament = await Tournament.findOne({ where: { url: `https://challonge.com/${req.params.url}` } });
      tournament.name = req.body.name;
      tournament.registration = req.body.registration;
      tournament.save();
      return res.send({ tournament });
    } catch (error) {
      return res.status(400).send({
        error: 'failed to update tournament',
      });
    }
    // implement update tournament
  },

  async create(req, res) {
    TournamentService.create({
      name: req.body.name,
      url: req.body.url,
      admin_ids_csv: '2533124,2875561,2842096,2842154,2875563',
    })
      .then(async (response) => {
        console.log(response.data.tournament);
        const tournament = await Tournament.create({
          name: response.data.tournament.name,
          url: response.data.tournament.full_challonge_url,
          registration: false,
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
    console.log(req.body);
    // Check for following on twitch with req.body.twitchname
    const checkTwitchname = await Participant.findOne(
      { where: { twitchname: req.body.twitchname, tournament_url: req.params.url } },
    );
    if (checkTwitchname) {
      return res.status(400).send({
        errors: ['Somebody already registered with that twitch name'],
      });
    }

    const tourney = await Tournament.findOne({ where: { url: `https://challonge.com/${req.params.url}` } });
    if (!tourney.registration) {
      return res.status(400).send({
        errors: ['Registration for this tournament is not possible at the moment'],
      });
    }

    const checkLolname = await Participant.findOne(
      { where: { lolname: req.body.lolname, tournament_url: req.params.url } },
    );
    if (checkLolname) {
      return res.status(400).send({
        errors: ['Somebody already registered with that summoner name'],
      });
    }
    try {
      await FollowerService.doesFollow(req.body.twitchname, 'lancemenot');
    } catch (error) {
      if (error.response.status === 404) {
        console.log(error.response);
        return res.status(400).send({
          errors: ['Sorry you are not following Lancemenot yet. Only followers are allowed to participate'],
        });
      }
      if (error.response.status !== 200) {
        return res.status(400).send({
          errors: [
            'Something went wrong when checking if you follow Lancemenot',
            'Try again or notify Askir if the error persists'],
        });
      }
    }

    try {
      await TournamentService.addParticipant(req.params.url, {
        name: req.body.lolname,
      });
    } catch (error) {
      return res.status(400).send({
        errors: error.response.data.errors,
      });
    }

    try {
      const participant = await Participant.create({
        lolname: req.body.lolname,
        twitchname: req.body.twitchname,
        tournament_url: req.params.url,
      });
      return res.send({
        message: `successfully added user ${participant.lolname}`,
      });
    } catch (databaseError) {
      return res.status(400).send({
        errors: [
          'User was added to tournament but something else went wrong.',
          'If you are nice you can make a screenshot and notify askir'],
      });
    }
  },
};
// 'something went wrong please try again or contact
// Askir (sgt_askir on twitch) if the error persists',
