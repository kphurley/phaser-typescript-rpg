<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Menu</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs4>
                <PlayButton />
                Play a Game
              </v-flex>
              <v-flex xs4>
                <PartyButton />
                Configure Party
              </v-flex>
              <v-flex xs4>
                <SettingsButton />
                Settings
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PartyButton from './main_menu/PartyButton.vue';
import PlayButton from './main_menu/PlayButton.vue';
import SettingsButton from './main_menu/SettingsButton.vue';

@Component({
  components: {
    PartyButton,
    PlayButton,
    SettingsButton
  }
})
export default class MainMenu extends Vue {}
</script>
