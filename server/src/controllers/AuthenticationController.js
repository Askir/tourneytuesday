
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(username, password) {
    User.create({
      username,
      password,
    });
  },

  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ where: { username: login } });
      if (!user) {
        return res.status(403).send({
          errors: ['login incorrect'],
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          errors: ['login incorrect'],
        });
      }
      return res.send({
        message: 'Login successful',
        token: jwtSignUser(user.toJSON()),
        user,
      });
    } catch (error) {
      return res.status(500).send({
        errors: ['An error has occured trying to login'],
      });
    }
  },
};
