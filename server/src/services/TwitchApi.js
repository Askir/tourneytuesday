const axios = require('axios');

module.exports = () => axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  timeout: 2000,
});
