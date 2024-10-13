import {defineStore} from "pinia";
import type {Ref} from "vue";

interface LevelData {
  id:number; // 等级id
  name: string;// 等级名称
  level: string; // 等级
  icon: string; // 等级图标
}
export interface UserDataInterface {
  id:number; // 用户id
  nickname: string;
  level: LevelData; // 用户等级
  avatar: string;
  email: string;
  sex: number;
  point: number; // 积分
  experience: number; // 经验值
  brokerageEnabled:string; // 是否成为推广员
}
// 用户信息
export const useUserStore = defineStore("user", () => {
  const userData = ref() as Ref<UserDataInterface>;

  const setUserStore = (newUserData:any) => {
    userData.value = newUserData;
  };
  const reset = () => {
    userData.value = undefined as any;
    localStorage.removeItem("user");
  };
  return {
    setUserStore,
    userData,
    reset
  };
}, {
  persist: true
});