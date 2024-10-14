import {defineStore} from "pinia";
import type {Menu} from "@/types/menuInterface";

export const useMenuStore = defineStore("menuStoreId", {
  state: () => {
    return {
      menu: [{
        title: "置顶",
        icon: "ArrowUpCircleIcon"
      },
      {
        title: "底部",
        icon: "ArrowDownCircleIcon"
      },
        {
          title: "主题",
          icon: "SparklesIcon"
        } as Menu]
    };
  },
  actions: {
    setWithComment() {
      this.menu = [
        {
          title: "置顶",
          icon: "ArrowUpCircleIcon"
        },
        {
          title: "底部",
          icon: "ArrowDownCircleIcon"
        },
        {
          title: "主题",
          icon: "SparklesIcon"
        },
        {
          title: "评论区",
          icon: "ChatBubbleLeftEllipsisIcon"
        }
      ];
    },
    setWithoutComment() {
      this.menu = [
        {
          title: "置顶",
          icon: "ArrowUpCircleIcon"
        },
        {
          title: "底部",
          icon: "ArrowDownCircleIcon"
        },
        {
          title: "主题",
          icon: "SparklesIcon"
        }
      ];
    }
  }
});
