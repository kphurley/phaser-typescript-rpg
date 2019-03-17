import Vue from 'vue';
import Vuex from 'vuex';

import {UserModule} from './UserModule';

Vue.use(Vuex);

export const store = new Vuex.Store({modules: {userModule: UserModule}});
