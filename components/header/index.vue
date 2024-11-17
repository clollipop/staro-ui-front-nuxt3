<script setup lang="ts">
import {useGlobalStore} from "@/store/globalStore";
import {useUserStore} from "@/store/userStore";
import {useTokenStore} from "@/store/tokenStore";
import type {Ref} from "vue";

const globalState = useGlobalStore();

function back2Home() {
  isHovered.value = false;
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

const isHovered = ref(false);

/**
 * 打开搜索功能
 */
function openSearch() {
  globalState.setShowSearch(true);
}

/**
 * 登录 打开弹窗
 */
const loginRef = ref();
const openLogin = async () => {
  loginRef.value.open();
};
/**
 * 登录成功回调
 */
const userStore = useUserStore();
const tokenStore = useTokenStore();
/* 登录成功回调 */
const successLogin = async () => {

};
/**
 * 下拉框点击事件
 */
const commandHandle = (command: string | number | object) => {
  /* 退出登录 */
  if (command === "logout") {
    userStore.reset();
    tokenStore.reset();
    // 保存用户信息
    ElMessage.success({
      message: "退出登录成功",
      type: "success",
      duration: 1000
    });
  } else if (command === "info") {
    // 个人信息
    skip("userInfo");
  }
};
/**
 * 打开侧边栏
 */
// 注入响应式的值
// 注入父组件提供的drawer状态
const drawer = inject("drawer") as Ref<boolean>;
const openDrawer = () => {
  drawer.value = true;
};
</script>
<template>
  <Search />
  <login
    ref="loginRef"
    @success="successLogin"
  />
  <div
    id="nav"
    class="ss-font stress bottom-line-1 fixed flex items-center justify-center top-0 "
  >
    <!--  网站名  -->
    <div
      class="left hover-shadow absolute left-7 cursor-pointer"
      @click="back2Home()"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        v-if="!isHovered"
      >
        Star博客
      </div>
      <div
        v-else
        class="bg-light-blue rounded-md w-20 h-10 flex justify-center items-center shadow-md"
      >
        <span style="font-size: 1.2rem">🏠</span>
      </div>
    </div>
    <!--  导航  -->
    <div
      v-if="!isMobile"
      class="center items-center cursor-pointer"
    >
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="back2Home()"
      >
        <span class="hvr-icon">🏖️</span>
        首页
      </span>
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="skip('sort')"
      >
        <span class="hvr-icon">🎉</span>
        分 类
      </span>
      <span
        class="center__item hover-shadow mr-8 hvr-icon-scale-shake"
        @click="skip('barrage')"
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
    <div :class="`right cursor-pointer absolute flex items-center ${isMobile ? 'right-3' : 'right-7'}`">
      <!--  搜索  -->
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
      <div v-if="!isMobile">
        <!--  登录    -->
        <span
          v-if="!userStore.userData?.id"
          class="ml-4 hover-shadow hvr-icon-scale-shake"
          @click="openLogin()"
        >
          <SvgIcon
            style="font-size: 18px"
            class="icon-shuijue hvr-icon text-lg"
            icon="shuijue"
          />
          登录
        </span>
        <!-- 登录成功-->
        <el-dropdown
          v-else
          @command="commandHandle"
        >
          <el-avatar
            class="ml-6"
            :src="'https://q1.qlogo.cn/g?b=qq&nk=1792945133&s=640'"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        v-else
        @click="openDrawer()"
      >
        <Icon
          class="hvr-icon text-2xl mt-1 ml-2"
          name="line-md:menu-unfold-left"
        />
        <div />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg-light-blue {
  background-color: #39c5bb;
  border: 1px solid rgba(0, 0, 0, 0.1); /* 添加轻微的实线边框 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 添加虚化的阴影 */
}

#nav {
  height: 58px;
  width: inherit;
  z-index: 9;
  letter-spacing: 0.08em;
  color: rgb(var(--z-fontcolor));
  border-radius: 0 0 5px 5px; ;
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
