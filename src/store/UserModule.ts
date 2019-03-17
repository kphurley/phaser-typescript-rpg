import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import {myUserApi, User} from '../api/User';

@Module
export class UserModule extends VuexModule {
  user?: User;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  @Action
  fetchMyUser() {
    return myUserApi.get().then((res) => {
      this.context.commit('setUser', res.data);
    });
  }
}
