module.exports = (sequelize, DataTypes) => sequelize.define('Tournament', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
});
