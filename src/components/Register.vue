<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Register extends Vue {
  msg: string = "REGISTER"
}
</script>