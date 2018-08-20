module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'TournamentTuesday',
    user: process.env.DB_USER || 'TournamentTuesday',
    password: process.env.DB_PASS || 'TournamentTuesday',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tournamenttuesday.sqlite',
    },
  },
};
