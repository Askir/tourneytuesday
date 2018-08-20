const axios = require('axios');

module.exports = () => axios.create({
  baseURL: 'https://api.challonge.com/v1/',
  timeout: 2000,
});
