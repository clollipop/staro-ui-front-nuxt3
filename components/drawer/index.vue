<template>
  <div class="drawer">
    <!-- 侧边栏   -->
    <el-drawer
      v-model="drawer"
      :before-close="handleBeforeClose"
      :with-header="false"
      :style="getTheme()?'background-color: #303133;':'background-color: #ffffff;'"
      :size="'70vw'"
    >
      <div :class="`${drawer?'slide-in': 'slide-out'} drawer-content`">
        <div class="drawer-avatar">
          <el-avatar
            :fit="'cover'"
            :size="110"
            :src="`${userData?.avatar||'https://q1.qlogo.cn/g?b=qq&nk=1792945133&s=640'}`"
          />
        </div>
        <div class="drawer-count">
          <div class="article">
            <div>文章</div>
            <span>{{ webInfo.articleCount }}</span>
          </div>
          <div class="tag">
            <div>标签</div>
            <span>{{ webInfo.labelCount }}</span>
          </div>
          <div class="category">
            <div>分类</div>
            <span>{{ webInfo.sortCount }}</span>
          </div>
        </div>
        <div class="divider">
          <span
            class="scissors"
            :style="getTheme()?'background-color: #303133;':'background-color: #ffffff;'"
          >
            ✂
          </span>
          <hr class="drawer-line">
        </div>
        <div class="menu cursor-pointer">
          <span
            class=" hover-shadow hvr-icon-scale-shake"
            @click="back2Home()"
          >
            <span class="hvr-icon">🏖️</span>
            首页
          </span>
          <span
            class=" hover-shadow hvr-icon-scale-shake"
            @click="skip('sort')"
          >
            <span class="hvr-icon">🎉</span>
            分 类
          </span>
          <span
            class=" hover-shadow hvr-icon-scale-shake"
            @click="skip('barrage')"
          >
            <span class="hvr-icon">🍵</span>
            留 言
          </span>
          <span
            class="hover-shadow  hvr-icon-scale-shake"
            @click="skip('friends')"
          >
            <span class="hvr-icon">💤</span>
            友 链
          </span>
          <span
            v-if="userData"
            class="hover-shadow  hvr-icon-scale-shake"
            @click="logout()"
          >
            <span class="hvr-icon">🫧</span>
            退出登录
          </span>
        </div>
        <div
          class="drawer-footer cursor-pointer"
          @click="userData?skip('userInfo'):openLogin()"
        >
          <span
            v-if="userData"
            class="flex items-center"
          >
            <span style="font-size: 20px;">🎊</span>个人信息
            <Icon
              name="line-md:chevron-right"
            />
          </span>
          <span v-else>
            登录&注册
            <Icon
              name="line-md:chevron-right"
            />
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
  <div>
    <login
      ref="loginRef"
      @success="successLogin"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {useWebInfoStore} from "@/store/webInfoStore";
import {useUserStore} from "@/store/userStore";
import {getTheme} from "@/utils/utils";
import {useTokenStore} from "~/store/tokenStore";

const props = defineProps<{
  modelValue: boolean;
}>();
const drawer = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
  drawer.value = newValue;
});
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const handleBeforeClose = () => {
  drawer.value = false;
  emit("update:modelValue", false);
};

function back2Home() {
  navigateTo("/");
  drawer.value = false;
  emit("update:modelValue", false);
}

/**
 * 界面跳转
 * @param path
 */
function skip(path: string) {
  navigateTo(`/${path}`);
  drawer.value = false;
  emit("update:modelValue", false);
}

const webInfoStore = useWebInfoStore();
const tokenStore = useTokenStore();
const userStore = useUserStore();
const webInfo = ref();
const userData = ref(userStore.userData);
nextTick(() => {
  webInfo.value = webInfoStore.webInfo;
});
/**
 * 登录 打开弹窗
 */
const loginRef = ref();
const openLogin = async () => {
  loginRef.value.open();
};
/* 登录成功回调 */
const successLogin = async () => {
  drawer.value = false;
  userData.value = useUserStore().userData;
  emit("update:modelValue", false);
};
const route = useRoute();
// 退出登录
const logout = () => {
  userStore.reset();
  tokenStore.reset();
  userData.value = null;
  drawer.value = false;
  // 判断当前是否在userInfos页面，如果是，则跳转到首页
  if(route.path === "/userInfo"){
    navigateTo("/");
  }
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
.drawer {
  overflow: hidden;
  display: flex;
  /* 根据需要添加样式 */
  &-content {
    height: 100%;
    color: var(--z-action-color);
  }

  &-avatar {
    display: flex;
    justify-content: center;
  }

  &-count {
    display: flex;
    margin-top: 20px;
    font-size: 18px;
    justify-content: space-between;
    text-align: center;

    span {
      font-size: 20px;
    }
  }

  .divider {
    position: relative;
    display: flex;
    align-items: center;
  }

  .scissors {
    color: #d2ebfd;
    position: absolute;
    left: 8%;
    transform: translateX(-50%);
    font-size: 24px;
    padding: 0;
  }

  &-line {
    border: 2px dashed #d2ebfd;
    margin: 20px 0;
    width: calc(100% - 4px);
  }

  .menu {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-size: 18px;

    span {
      margin: 5px 0;
    }
  }
}

/* 动画效果 */
.slide-in {
  animation: slideIn 1.5s forwards;
}

.slide-out {
  animation: slideOut 1s forwards;
}

@keyframes slideIn {
  0% {
    transform: translateX(8%); /* 从右侧进入 */
    opacity: 0;
  }
  100% {
    transform: translateX(0); /* 到达原位 */
    opacity: 1;
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0); /* 从原位开始 */
    opacity: 1;
  }
  100% {
    transform: translateX(100%); /* 向右侧退出 */
    opacity: 0;
  }
}

.drawer-footer {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  right: 0;
  font-size: 16px;
}
</style>
