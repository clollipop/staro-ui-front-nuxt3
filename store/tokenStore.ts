import {defineStore} from "pinia";
import type {Ref} from "vue";

interface TokenData {
  accessToken: string;
  expiresTime: number;
  refreshToken: string;
  userId: number;
}
// 用户信息
export const useTokenStore = defineStore("token", () => {
  const tokenData = ref() as Ref<TokenData>;

  const seTokenStore = (newTokenData:any) => {
    tokenData.value = newTokenData;
  };
  const reset = () => {
    tokenData.value = undefined as any;
    localStorage.removeItem("token");
  };
  return {
    seTokenStore,
    tokenData,
    reset
  };
}, {
  persist: true
});