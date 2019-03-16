import 'phaser';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import Vuetify from 'vuetify';

import Game from './components/Game.vue';
import Login from './components/Login.vue';
import Menu from './components/Menu.vue';
import Register from './components/Register.vue';
import {store} from './store';
import VueApp from './VueApp.vue';

Vue.use(Vuetify, {
  theme: {
    primary: '#8bc34a',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});
Vue.use(VueRouter);

const routes = [
  {path: '/login', component: Login}, {path: '/register', component: Register},
  {path: '/game', component: Game, meta: {requiresAuth: true}},
  {path: '/menu', component: Menu, meta: {requiresAuth: true}},
  {path: '/', component: Login}
];

const router = new VueRouter({routes});

const vue = new Vue({
  el: '#vue-app',
  router,
  store,

  render: h => h(VueApp)
});
