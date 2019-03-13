<template>
  <div class="black-background roboto">
    <div class="centered login">
      <div class="container login-text centered-horizontally">
        {{ loginText }}
      </div>
      <div class="container">
        <input class="full-width-of-parent roboto input" placeholder="Email" type="email" />
      </div>
      <div class="container">
        <input class="full-width-of-parent roboto input" placeholder="Password" type="password" />
      </div>
      <div class="container centered-horizontally">
        <button class="roboto submit-button">Submit</button>
      </div>
      <div class="container centered-horizontally">
        <router-link to="/register">{{ registerText }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Login extends Vue {
  loginText: string = "Login";
  registerText: string = "Register";
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.black-background {
  background: black;
  height: 100%;
  position: fixed;
  width: 100%;
}

.roboto {
  font-family: 'Roboto', sans-serif;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-horizontally {
  text-align: center;
}

.login {
  background: green;
  border-radius: 10px;
  width: 400px;
  height: 400px;
}

.login-text {
  color: white;
  font-size: xx-large;
}

.container {
  padding: 20px 20px 20px 20px;
}

.full-width-of-parent {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  padding: 4px;
  width: 100%;
  height: 100%;
  background: #fff;
  border: solid 1px #666;
}

.submit-button {
  font-size: x-large;
  border-radius: 5px;
}

.input {
  font-size: x-large;
  border-radius: 5px;
}
</style>
