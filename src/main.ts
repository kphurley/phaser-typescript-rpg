import 'phaser';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import {router} from './routes';
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

const vue = new Vue({
  el: '#vue-app',
  router,
  store,

  render: h => h(VueApp)
});

// Export a reference to the vuex store so phaser can use it
export const vueStore = vue.$store;
