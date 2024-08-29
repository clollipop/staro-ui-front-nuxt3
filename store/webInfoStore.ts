// 网站主题信息
import {defineStore} from "pinia";
import type {Ref} from "vue";
// webInfo Class
interface webInfoStore {
  name: string
  title: string
  notices: string
  footer: string
  backgroundImage: string
  avatar: string
  randomAvatar: []
  randomName: []
  randomCover: []
}
export const useWebInfoStore = defineStore("useWebInfoStore", () => {
  const webInfo = ref() as Ref<webInfoStore>;

  const setWebInfoStore = (webInfoData:any) => {
    webInfo.value = webInfoData;
  };
  const getRandomAvatar = ()=>{
    return webInfo.value?.randomAvatar[Math.floor(Math.random()*webInfo.value?.randomAvatar.length)];
  };
  return {
    setWebInfoStore,
    getRandomAvatar,
    webInfo
  };
}, {
  persist: true
});