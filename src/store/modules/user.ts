import { loginPassword } from '/@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { AnyObject } from '/#/global';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);
const sessionKey = useCookies().get('sessionKey' as string);

interface StoreUser {
  token?: string;
  sessionKey?: string;
  info?: AnyObject;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    info: {},
    sessionKey: sessionKey,
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
    getUserSessionKey(): any {
      return this.sessionKey || '';
    },
  },
  actions: {
    setInfo(info: any) {
      return new Promise((resolve) => {
        this.info = info || {};
        resolve('success');
      });
    },
    login(params: any) {
      return new Promise((resolve) => {
        loginPassword(params).then((res: any) => {
          this.setInfo(res.result);
          useCookies().set(VITE_TOKEN_KEY, res.result.author);
          resolve(res.value);
        });
      });
    },
    setSessionKey(sessionKey: String) {
      return new Promise((resolve) => {
        useCookies().set('sessionKey', sessionKey);
        resolve('success');
      });
    },
  },
});
