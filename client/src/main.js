import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepPurple.darken2,
    secondary: colors.deepPurple.lighten1,
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

sync(store, router);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
