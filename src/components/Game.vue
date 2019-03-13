<template>
  <div id="vue_layer">
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {GridScene} from '../scenes/GridScene';

@Component
export default class Game extends Vue {
  msg: string = "Hello from VueApp"

  mounted () {
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
  }
}
</script>

<style>
#vue_layer {
  position: fixed; /* Sit on top of the page content */
  display: block;
  width: 100%; /* Full width (cover the whole page) */
  height: 20%; /* Bottom 20% of page */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2;
  cursor: pointer; /* Add a pointer on hover */
}
</style>