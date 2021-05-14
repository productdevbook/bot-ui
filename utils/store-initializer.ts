import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import store from '~/store/defaultStore';

let defaultStore: store;
function initialiseStores(s: Store<store>): void {
  defaultStore = getModule<store>(store, s);
}

export { initialiseStores, defaultStore };
