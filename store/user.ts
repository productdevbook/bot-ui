import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';

interface User {
  id: string;
  username: string;
  roles: string[];
}

const state = (): User => ({
  id: '0',
  username: 'John Doe',
  roles: ['user']
});

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class UserStore extends VuexModule {
  _user = state();

  @VuexMutation
  setUser(data: User) {
    this._user = data;
  }

  @VuexAction({ commit: 'setUser' })
  login(user: User) {
    return user;
  }

  @VuexAction({ commit: 'setUser' })
  logout() {
    return state();
  }

  get me() {
    return this._user;
  }
}
