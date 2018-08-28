const Api = require('./TwitchApi');

module.exports = {
  doesFollow(userId, channelId) {
    return Api().get(`users/${userId}/follows/channels/${channelId}`, {
      headers: {
        'client-id': 'jvlvyw8772naxw8cnhk4z0h1tnwv3w',
      },
    });
  },
};
