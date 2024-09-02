<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { TocInterface } from "@/types/tocInterface";
import { useArticleStore } from "@/store/articleStore";
import {debounce} from "lodash";

const props = defineProps({
  toc: {
    type: Object,
    required: true
  }
});

const articleStore = useArticleStore();
const observer = ref<IntersectionObserver | null>(null);

/**
 * 滚动至指定标题
 */
function scrollToTitle() {
  // 防止重复设置当前选中标题
  articleStore.setOnClick(true);
  articleStore.setSelectTitle(props.toc.id);

  const target = document.getElementById(props.toc.id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    articleStore.setOnClick(false);
  }, 500);
}

/**
 * 设置目录项高亮
 */
function setActiveToc(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      articleStore.setSelectTitle(entry.target.id);
    }
  }
}

onMounted(() => {
  nextTick(debounce(async() => {
    // 创建IntersectionObserver实例
    observer.value = new IntersectionObserver(setActiveToc, {
      root: document.querySelector("#primary"), // 设置根元素
      rootMargin: "0px 0px -80% 0px", // 调整触发范围
      threshold: 0.09 // 当至少10%的标题出现在视口中时触发
    });
    // 监听所有目录项对应的标题元素
    const target = document.getElementById(props.toc.id);
    if (target) {
      observer.value?.observe(target);
    }
  },300));
});

onBeforeUnmount(() => {
  // 清除观察器
  observer.value?.disconnect();
});
</script>

<template>
  <div
    class="toc-list-item py-0.5 cursor-pointer"
    :class="[toc.className, articleStore.selectTitle === toc.id ? 'active' : '']"
    @click="scrollToTitle"
  >
    {{ toc.name }}
  </div>
</template>

<style scoped lang="scss">
.toc-list-item {
  overflow: hidden;
  white-space: nowrap;

  &.active {
    font-size: 100%;
    font-weight: 600;
    color: rgb(var(--z-primary-color));
  }
}
.toc-item-h2 {
  margin-left: 0.5em;
}
.toc-item-h3 {
  margin-left: 1em;
}
.toc-item-h4 {
  margin-left: 1.5em;
}
.toc-item-h5 {
  margin-left: 2em;
}
.toc-item-h6 {
  margin-left: 2.5em;
}
</style>
