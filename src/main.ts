import 'phaser';

import Vue from 'vue';
import VueRouter from 'vue-router';

import VueApp from './VueApp.vue';

import Game from './components/Game.vue';
import Login from './components/Login.vue';
import Menu from './components/Menu.vue';
import Register from './components/Register.vue';

// import store from './store'

Vue.use(VueRouter);

const routes = [
  { path: '/game', component: Game },
  { path: '/login', component: Login },
  { path: '/menu', component: Menu },
  { path: '/register', component: Register },
  { path: '/', component: Login }
];

const router = new VueRouter({ routes });

const vue = new Vue({
  el: '#vue-app',
  router,
  // store,

  render: h => h(VueApp)
});
