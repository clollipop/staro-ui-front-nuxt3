<script setup lang="ts">
import {useMenuStore} from "@/store/menuStore";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  SparklesIcon
} from "@heroicons/vue/24/solid";
import {getTheme, switchTheme} from "@/utils/utils";
import type {Menu} from "@/types/menuInterface";

/**
 * 定义菜单图标
 */
const menuMap = new Map<string, any>();
menuMap.set("ArrowUpCircleIcon", ArrowUpCircleIcon);
menuMap.set("ArrowDownCircleIcon", ArrowDownCircleIcon);
menuMap.set("ChatBubbleLeftEllipsisIcon", ChatBubbleLeftEllipsisIcon);
menuMap.set("SparklesIcon", SparklesIcon);

const menuState = useMenuStore();
const theme = ref(getTheme());

function clickMenu(menuItem: Menu) {
  if (menuItem.title === "主题") {
    switchTheme();
    theme.value = getTheme();
  } else if (menuItem.title === "置顶") {
    const dom = document.querySelector("#main");
    if (!dom) {
      document.querySelector("#article")?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      dom?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  } else if (menuItem.title === "评论区") {
    document.querySelector("#comment")?.scrollIntoView({
      behavior: "smooth"
    });
  } else if (menuItem.title === "底部") {
    document.querySelector("#footer")?.scrollIntoView({
      behavior: "smooth"
    });
  }
}
</script>

<template>
  <div
    id="menu"
    class="absolute"
  >
    <div class="menu-container flex flex-col">
      <ul class="menu-button-list">
        <li
          v-for="menuItem in menuState.menu"
          :key="menuItem.title"
          :class="`mt-1 ${menuItem.title === '主题'? 'menu-button-list-item-svg' : 'menu-button-list-item'}`"
          @click="clickMenu(menuItem)"
        >
          <span
            :title="menuItem.title"
            class="normal-svg"
          >
            <component
              :is="menuMap.get(menuItem.icon)"
              v-if="!(menuItem.title === '主题')"
              style="width: 30px; height: 30px;"
            />
            <span
              v-else-if="theme"
              class="theme-icon"
            >
              <span
                style="font-size: 16px;font-weight: bold;"
                class="iconfont icon-shuimian"
              />
            </span>
            <span
              v-else
              class="theme-icon"
            >
              <span
                style="font-size: 16px;  font-weight: bold;"
                class="iconfont  icon-sun"
              />
            </span>
          </span>
          <span class="menu-item-title" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
#menu {
  right: 20px;
  bottom: 80px;
  z-index: 9;
  color: rgb(var(--z-common-bg));
}

.menu-container {
  user-select: none;
  width: auto;
}

.menu-button-list {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  padding: 0; /* 取消默认内边距 */
  margin: 0; /* 取消默认外边距 */
  list-style-type: none; /* 取消默认列表样式 */
}

.menu-button-list-item {
  padding: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s ease-in;
  border-radius: 10px;
  background-color: rgba(211, 211, 211, 0.6);

  &:hover {
    color: rgba(var(--z-primary-color), 1);
    background-color: rgba(#ffff, 0.9);
  }

  .normal-svg {
    //margin-right: 8px; /* 图标和文本之间的间距 */
  }
}

.theme-icon {
  background-color: rgb(var(--z-common-bg));
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 4px 5px;
}

.menu-button-list-item-svg {
  color: #8D9492;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s ease-in;
  border-radius: 10px;
  background-color: rgba(211, 211, 211, 0.6);

  &:hover {
    color: rgba(#ffff, 0.9);
    background-color: rgba(#ffff, 0.9);

    // 改变 .theme-icon 的背景颜色
    .theme-icon {
      background-color: rgba(var(--z-primary-color), 0.6);
    }
  }
}
</style>
