import Vue from 'vue';
import Router from 'vue-router';
import TournamentCreation from '@/components/TournamentCreation.vue';
import TournamentList from '@/components/TournamentList.vue';
import Register from '@/components/TournamentRegistration.vue';
import Login from '@/components/Login.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: TournamentList,
    },
    {
      path: '/tournament/create',
      name: 'TournamentCreation',
      component: TournamentCreation,
    },
    {
      path: '/tournament/:url/register',
      name: 'register',
      component: Register,
    },
  ],
});
