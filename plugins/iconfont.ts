import "@/static/iconfont/iconfont.css";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // 确保 window 对象存在
  if (typeof window !== "undefined") {
    // 动态加载 iconfont.js 文件
    import("@/static/iconfont/iconfont.js");
  }
});
