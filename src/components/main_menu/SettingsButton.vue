<template>
  <svg
    @click="handleClick"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    @style="style"
  >
    <defs>
      <filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%">
        <feFlood flood-color="rgba(255, 255, 255, 1)" result="flood"></feFlood>
        <feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite>
        <feGaussianBlur in="composite" stdDeviation="5" result="blur"></feGaussianBlur>
        <feOffset dx="0" dy="0" result="offset"></feOffset>
        <feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite>
      </filter>
      <radialGradient id="gradient-2">
        <stop offset="0%" stop-color="#b8e986" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#7ed321" stop-opacity="1"></stop>
      </radialGradient>
    </defs>
    <path d="M10 10h492v492H10z" fill="#c9c9c9" fill-opacity="1" stroke="#9b9b9b" stroke-opacity="1" stroke-width="10"></path>
    <g class="" transform="translate(0,0)" style="touch-action: none;">
      <path d="M87 32v71h18V32H87zm160 0v345h18V32h-18zm160 0v167h18V32h-18zM50 121c-5.14 0-9 3.9-9 9v28c0 5.1 3.86 9 9 9h92c5.1 0 9-3.9 9-9v-28c0-5.1-3.9-9-9-9H50zm37 64v295h18V185H87zm283 32c-5.1 0-9 3.9-9 9v28c0 5.1 3.9 9 9 9h92c5.1 0 9-3.9 9-9v-28c0-5.1-3.9-9-9-9h-92zm37 64v199h18V281h-18zM210 395c-5.1 0-9 3.9-9 9v28c0 5.1 3.9 9 9 9h92c5.1 0 9-3.9 9-9v-28c0-5.1-3.9-9-9-9h-92zm37 64v21h18v-21h-18z" fill="url(#gradient-2)" stroke="#ccc" stroke-opacity="1" stroke-width="8" filter="url(#shadow-1)"></path>
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class SettingsButton extends Vue {
  handleClick() {
    console.log("Settings button was clicked");
  }

  get style() {
    return "height: 128px; width: 128px;";
  }
}
</script>
