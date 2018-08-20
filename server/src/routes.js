const TournamentController = require('./controllers/TournamentController');

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'hello world',
    });
  });

  app.post('/tournament/create', TournamentController.create);
};
