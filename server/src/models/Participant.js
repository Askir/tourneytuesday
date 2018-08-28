module.exports = (sequelize, DataTypes) => sequelize.define('Participant', {
  lolname: {
    type: DataTypes.STRING,
  },
  twitchname: {
    type: DataTypes.STRING,
  },
  tournament_url: {
    type: DataTypes.STRING,
  },
});
