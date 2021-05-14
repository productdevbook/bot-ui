import { Store } from 'vuex';
import { initialiseStores } from '~/utils/store-initializer';

const initializer = (store: Store<unknown>) => initialiseStores(store);
export const plugins = [initializer];
export * from '~/utils/store-initializer';

export const strict = false;
