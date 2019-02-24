<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({

})

export default class VueApp extends Vue {
  msg: string = "Hello from VueApp"

  mounted () {}
}
</script>