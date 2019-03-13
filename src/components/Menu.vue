<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Menu extends Vue {
  msg: string = "MENU"
}
</script>