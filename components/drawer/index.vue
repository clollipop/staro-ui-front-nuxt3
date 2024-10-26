<template>
  <div class="drawer">
    <!-- 侧边栏   -->
    <el-drawer
      v-model="drawer"
      :before-close="handleBeforeClose"
      title="I am the title"
      :with-header="false"
      :size="'70vw'"
    >
      <div :class="`${drawer?'slide-in': 'slide-out'} drawer-content`">
        <div class="drawer-avatar">
          <el-avatar
            :fit="'cover'"
            :size="110"
            :src="'https://cube.elemecdn.com/6/94/4d3ea6c136348af54034b943b0a5bbf6.jpg'"
          />
        </div>
        <div class="drawer-count">
          <div class="article">
            <div>文章</div>
            <span>10</span>
          </div>
          <div class="tag">
            <div>标签</div>
            <span>5</span>
          </div>
          <div class="category">
            <div>分类</div>
            <span>3</span>
          </div>
        </div>
        <div class="divider">
          <span class="scissors">
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
            class=" hover-shadow  hvr-icon-scale-shake"
            @click="skip('friends')"
          >
            <span class="hvr-icon">💤</span>
            友 链
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  modelValue: boolean; // 使用 v-model 的规范命名
}>();

const drawer = ref(props.modelValue); // 将传入的值赋给 drawer
watch(() => props.modelValue, (newValue) => {
  drawer.value = newValue;
});
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void; // 定义 emit 事件
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
</script>

<style scoped lang="scss">
.drawer {
  overflow: hidden;
  display: flex;
  /* 根据需要添加样式 */
  &-content {
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
    background-color: white;
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
</style>
