import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import users from '~/store/user';

let userStore: users;

function initialiseStores(store: Store<any>): void {
  userStore = getModule(users, store);
}

export { initialiseStores, userStore };
