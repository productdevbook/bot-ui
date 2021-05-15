import { ApolloHelpers } from '@nuxtjs/apollo';
import { timer, Subscription } from 'rxjs';
import { execute, makePromise } from 'apollo-link';
import { Toasted } from 'vue-toasted/types';
import { Context } from '@nuxt/types';
import refreshToken from './refresh_token.graphql';
import link from '~/utils/httplink';

export class SessionManager {
  $apolloHelpers: ApolloHelpers;
  $toast: Toasted;
  redirect: Context['redirect'];
  refreshSub?: Subscription;
  refreshInterval = 600;

  constructor($apolloHelpers: ApolloHelpers, $toast: Toasted, redirect: Context['redirect'], refreshInterval: number) {
    this.$apolloHelpers = $apolloHelpers;
    this.$toast = $toast;
    this.redirect = redirect;
    this.refreshInterval = refreshInterval;
  }

  startSession() {
    const expiry = (this.refreshInterval - 60) * 1000;
    this.refreshSub = timer(1, expiry).subscribe(this.refreshSession);
    return this;
  }

  stopSession() {
    this.refreshSub?.unsubscribe();
    return this;
  }

  async refreshSession() {
    try {
      const options = {
        query: refreshToken,
        context: {
          headers: {
            authorization: `Bearer ${this.$apolloHelpers.getToken()}`
          }
        }
      };
      const response = await makePromise(execute(link, options));
      if (response.data?.refresh_token.accessToken) {
        const token = response.data?.refresh_token.accessToken;
        return this.$apolloHelpers.onLogin(token);
      }
    } catch (e) {
      console.log(e);
    }
    this.$toast.error('There was an issue. We will have to log you out, sorry.');
    await this.$apolloHelpers.onLogout();
    await this.redirect('/login');
  }
}
