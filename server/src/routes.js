const TournamentController = require('./controllers/TournamentController');
const AuthenticationController = require('./controllers/AuthenticationController');
const isAuthenticated = require('./policies/isAuthenticated');

require('./passport'); // as strategy in ./passport.js needs passport object

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'hello world',
    });
  });

  app.post('/login', AuthenticationController.login);

  app.get('/tournament/:url', TournamentController.show);

  app.post('/tournament/:url/user', TournamentController.addUser);

  app.post('/tournament/:url', isAuthenticated, TournamentController.update);

  app.get('/tournaments', TournamentController.index);

  app.post('/tournaments', isAuthenticated, TournamentController.create);
};
