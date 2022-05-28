import {Store} from 'vuex';
import jwt_decode from 'jwt-decode';
import {REFRESH_TOKENS} from '../store/mutationTypes';
import {AxiosOptions, NuxtAxiosInstance} from '@nuxtjs/axios';

export const tokenIsExpired = (token: string) => {
  const decodedAuthToken: any = jwt_decode(token);
  const currentDeviceTime = Math.round(new Date().getTime() / 1000 || 0);
  return currentDeviceTime > Math.round(decodedAuthToken?.exp || 0);
};

interface axiosInterface {
  $axios: NuxtAxiosInstance;
  store: Store<any>;
}

export default function ({$axios, store}: axiosInterface) {
  $axios.onRequest(async (config: any): Promise<any> => {
    if (config.url === '/auth/refreshToken') {
      return config;
    }

    const currentAuthToken =
      config?.headers?.common?.Authorization?.split(' ')[1] || undefined;
    if (currentAuthToken !== undefined && tokenIsExpired(currentAuthToken)) {
      // Refresh authToken
      await store.dispatch(
        `modules/auth/${REFRESH_TOKENS}`,
        store.state.modules.user.uuid,
      );
      config.headers.common.Authorization = `Bearer ${store.state.modules.auth.authToken}`;
    }
    return config;
  });
  $axios.onResponse(async (response: AxiosOptions): Promise<any> => {
    return response;
  });
}
