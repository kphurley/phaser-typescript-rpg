import 'phaser';
import Vue from 'vue'
import VueApp from './VueApp.vue'
//import store from './store'

import {GridScene} from './scenes/GridScene';

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: 1,
  backgroundColor: '#EDEEC9',
  scene: [GridScene]
};

const game = new Phaser.Game(config);


new Vue({
  el: '#vue-app',
  // store,
  render: h => h(VueApp)
})
