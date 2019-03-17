<template>
   <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="alternate_email" name="login" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                  <span v-else>{{ loginText }}</span>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link to="register">{{ registerText }}</router-link>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { Session, sessionApi } from '../api/Session';

@Component
export default class Login extends Vue {
  loginText: string = 'Submit';
  registerText: string = 'No account?  Register here';
  email = '';
  password = '';
  loading = false;

  login() {
    if (this.loading) return;

    this.loading = true;
    sessionApi.create({ email: this.email, password: this.password })
    .then(() => {
      this.loading = false;
      this.$router.push('menu');
    })
    .catch(console.error);
  }

  register() {
    this.$router.push('register');
  }
}
</script>
