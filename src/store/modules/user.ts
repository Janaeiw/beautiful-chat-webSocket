import { loginPassword } from '/@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { AnyObject } from '/#/global';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);
const uuid = useCookies().get("uuid" as string);

interface StoreUser {
  token?: string,
  uuid?: string,
  info?: AnyObject,
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    info: {},
    uuid: uuid,
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
    getUserUuid(): any {
      return this.uuid || "";
    },
  },
  actions: {
    setInfo(info: any) {
      return new Promise((resolve) => {
        this.info = info || {};
        resolve('success');
      })
    },
    login(params: any) {
      return new Promise((resolve) => {
        loginPassword(params).then((res: any) => {
          this.setInfo(res.result);
          useCookies().set(VITE_TOKEN_KEY, res.result.author);
          resolve(res.value);
        })
      });
    },
    setUuid(uuid: String) {
      return new Promise((resolve) => {
        useCookies().set("uuid", uuid);
        resolve('success');
      })
    }
  },
});
