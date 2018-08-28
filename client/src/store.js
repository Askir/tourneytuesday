import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token; // eslint-disable-line no-param-reassign
      if (token) {
        state.isUserLoggedIn = true; // eslint-disable-line no-param-reassign
      } else {
        state.isUserLoggedIn = false; // eslint-disable-line no-param-reassign
      }
    },
    setUser(state, user) {
      state.user = user; // eslint-disable-line no-param-reassign
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
