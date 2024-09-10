<script setup lang="ts">
import {AuthorImpl} from "@/types/impl/author";
import {useWebInfoStore} from "@/store/webInfoStore";

const authorInfo = new AuthorImpl();
const webInfoStore = useWebInfoStore();
// 使用 ref 来处理加载状态
const isLoading = ref(true);
// 监听 webInfoStore 的变化
watch(() => webInfoStore.webInfo, (newVal) => {
  if (newVal) {
    isLoading.value = false; // 数据加载完成
  }
}, {immediate: true});
</script>
<template>
  <div
    class="author-info box w-full flex flex-col justify-center"
  >
    <div
      class="author-info__avatar"
    >
      <img
        v-if="!isLoading"
        class="cover"
        :src="webInfoStore.webInfo?.avatar"
        :alt="webInfoStore.webInfo?.name"
      >
    </div>
    <div class="flex justify-center">
      <div class="author-info__primary mt-3">
        <div class="font-size-large font-semibold text-center">
          {{ webInfoStore.webInfo?.name }}
        </div>
        <div class="font-size-small my-2 text-center">
          {{ authorInfo.description[1] }}
        </div>
        <div class="author-info__social flex text-center">
          <a
            class="author-info__social-svg icon-button"
            :href="authorInfo.github"
          >
            <Icon
              name="logos:github-icon"
            />
          </a>
          <a
            class="author-info__social-svg icon-button"
            :href="'mailto:'+ authorInfo.email"
          >
            <Icon
              name="fluent-emoji-flat:open-mailbox-with-raised-flag"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.author-info {
  &__avatar {
    width: 77px;
    height: 77px;
    margin: 0 auto;
    overflow: hidden;

    .cover {
      border-radius: 50%;
    }
  }

  &__social {
    display: flex;
    flex-direction: row;
    justify-content: center;

    &-svg {
      display: block;
      margin: 3px;
      padding: 5px;
      height: 30px;
      width: 30px;
      font-size: 17px;
      background: rgba(var(--z-gray-color), .6);
      border-radius: 999px;

      &:hover {
        background-color: rgba(var(--z-primary-color), .1);
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.icon-button:hover {
  animation: scaleAndRotate 0.6s forwards; /* 悬停时执行缩放动画 */
  background-color: #f0f0f0; /* 悬停背景色 */
}

/* 定义缩放和旋转动画 */
@keyframes scaleAndRotate {
  0% {
    transform: scale(1) rotate(0deg); /* 初始状态 */
  }
  25% {
    transform: scale(1.1) rotate(-5deg); /* 向左旋转 */
  }
  50% {
    transform: scale(1.1) rotate(5deg); /* 向右旋转 */
  }
  75% {
    transform: scale(1.1) rotate(-2deg); /* 轻微向左旋转回 */
  }
  100% {
    transform: scale(1) rotate(0deg); /* 回复原状态 */
  }
}

</style>
