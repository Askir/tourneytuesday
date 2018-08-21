const TournamentController = require('./controllers/TournamentController');

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'hello world',
    });
  });

  app.get('/tournament/:url', TournamentController.show);

  app.post('/tournament/:url/user', TournamentController.addUser);

  app.get('/tournaments', TournamentController.index);

  app.post('/tournaments', TournamentController.create);
};
