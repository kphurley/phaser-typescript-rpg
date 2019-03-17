<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="info">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="name" label="Name" type="text" v-model="name"></v-text-field>
                  <v-text-field prepend-icon="person_outline" name="username" label="Username" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="alternate_email" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                  <v-text-field id="confirm-password" prepend-icon="lock" name="confirm-password" label="Confirm Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" v-on:click="registerNewUser">Register</v-btn>
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

import { User, userApi } from '../api/User';

@Component
export default class Register extends Vue {
  name = '';
  username = '';
  email = '';
  password = '';

  registerNewUser() {
    const newUserWithPassword = {
      email: this.email,
      name: this.name,
      username: this.username,
      credential: {
        password: this.password
      }
    }

    userApi.create({ user: newUserWithPassword }).then(() => {
      this.$router.push('login');
    }).catch(console.error);
  }
}
</script>
