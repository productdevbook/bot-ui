import { Module, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator';

const defaultState = () => ({
  user: {
    username: '',
    roles: [] as string[]
  },
  theme: 'dark',
  loading: false
});

@Module({
  name: 'default-store',
  stateFactory: true,
  namespaced: true
})
export default class DefaultStore extends VuexModule {
  _user = {
    username: '',
    roles: [] as string[]
  };

  _theme = 'dark';

  _loading = false;

  get user() {
    return this._user;
  }

  get theme() {
    return this._theme;
  }

  get loading() {
    return this._loading;
  }

  get admin() {
    return this._user.roles.includes('admin') || process.env.TARGET_STAGE === 'dev';
  }

  @VuexMutation
  RESET() {
    const state = defaultState();
    this._user = state.user;
    this._theme = state.theme;
    this._loading = state.loading;
  }

  @VuexMutation
  USER(user: { username: string; roles: string[] }) {
    this._user = user;
  }

  @VuexMutation
  THEME_TYPE(theme: string) {
    this._theme = theme;
  }

  @VuexMutation
  LOADING(status: boolean) {
    this._loading = status;
  }

  @VuexAction
  login(user: { username: string; roles: string[] }) {
    this.USER(user);
  }

  @VuexAction
  logout() {
    this.RESET();
  }

  @VuexAction
  setTheme(theme: string) {
    this.THEME_TYPE(theme);
  }

  @VuexAction
  setLoading(status: boolean) {
    this.LOADING(status);
  }

  @VuexAction
  resetState() {
    this.RESET();
  }
}
