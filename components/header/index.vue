<script setup lang="ts">
import {useGlobalStore} from "@/store/globalStore";

const globalState = useGlobalStore();

function back2Home() {
  navigateTo("/");
}
const {$viewport} = useNuxtApp();
const isMobile = $viewport.isLessThan("tablet");
/**
 * 界面跳转
 * @param path
 */
function skip(path: string) {
  navigateTo(`/${path}`);
}

/**
 * 打开搜索功能
 */
function openSearch() {
  globalState.setShowSearch(true);
}
</script>
<template>
  <Search />
  <div
    id="nav"
    class="ss-font stress bottom-line-1 fixed flex items-center justify-center top-0 rounded-b-xl"
  >
    <!--  网站名  -->
    <div
      class="left hover-shadow absolute left-7 cursor-pointer"
      @click="back2Home()"
    >
      Star博客
    </div>
    <!--  导航  -->
    <div v-if="!isMobile" class="center items-center cursor-pointer">
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="back2Home()"
      >
        <span class="hvr-icon">🏖️</span>
        首页
      </span>
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="skip('category')"
      >
        <span class="hvr-icon">🎉</span>
        分 类
      </span>
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="skip('comment')"
      >
        <span class="hvr-icon">🍵</span>
        留 言
      </span>
      <span
        class="center__item hover-shadow  hvr-icon-scale-shake"
        @click="skip('friends')"
      >
        <span class="hvr-icon">💤</span>
        友 链
      </span>
    </div>
    <!--  搜索  -->
    <div class="right cursor-pointer absolute right-7">
      <span
        class="normal-svg right__item hover-shadow hvr-icon-scale-shake"
        @click="openSearch()"
      >
        <Icon
          class="hvr-icon text-lg"
          name="fxemoji:leftmagnifyingglass"
        />
        搜索
      </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
#nav {
  height: 58px;
  width: inherit;
  z-index: 9;
  letter-spacing: 0.08em;
  color: rgb(var(--z-fontcolor));
}

/* 添加背景渐变的动画 */
@keyframes backgroundGradient {
  0% {
    background: linear-gradient(120deg, #ffd1dc 0%, #a1eafb 50%, #ffcef3 100%);
  }
  50% {
    background: linear-gradient(120deg, #ffa3b1 0%, #7cd2ff 50%, #ff9fd6 100%);
  }
  100% {
    background: linear-gradient(120deg, #ffd1dc 0%, #a1eafb 50%, #ffcef3 100%);
  }
}
/* 添加黑夜背景渐变的动画 */
@keyframes backgroundGradientDark {
  0% {
    background: linear-gradient(120deg, #2c3e50 0%, #4ca1af 50%, #2c3e50 100%);
  }
  50% {
    background: linear-gradient(120deg, #34495e 0%, #7f8c8d 50%, #34495e 100%);
  }
  100% {
    background: linear-gradient(120deg, #2c3e50 0%, #4ca1af 50%, #2c3e50 100%);
  }
}
// 滚动
[scroll="scroll"] #nav {
  border-bottom: 1px solid rgba(102, 102, 102, .05);
  background: linear-gradient(120deg, #ffd1dc 0%, #a1eafb 50%, #ffcef3 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.5s ease-in-out; /* 添加动画过渡效果 */
  border-bottom: none;
  animation: backgroundGradient 15s ease infinite; /* 背景渐变动画 */
}

// 黑夜滚动
[scroll="scroll"][data-theme="dark"] #nav {
  border-bottom: 1px solid rgba(102, 102, 102, .05);
  background: linear-gradient(120deg, #2c3e50 0%, #4ca1af 50%, #2c3e50 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.5s ease-in-out; /* 添加动画过渡效果 */
  border-bottom: none;
  animation: backgroundGradientDark 15s ease infinite; /* 背景渐变动画 */
}

// 未滚动
[scroll="primary"] #nav {
  color: rgb(var(--z-primary-fontcolor));
  background-color: transparent;
  border-bottom: none;
}
</style>
