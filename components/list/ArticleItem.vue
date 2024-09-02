<script setup lang="ts">
import {CalendarDaysIcon, RocketLaunchIcon} from "@heroicons/vue/24/solid";
import {formatDateTime} from "@/static/modules/utils";
import {useWebInfoStore} from "@/store/webInfoStore";

const webInfoStore = useWebInfoStore();
defineProps({
  article: {
    type: Object,
    required: true
  }
});

function showArticleDetail(article: any) {
  navigateTo(`/p/${article.id}`);
}
</script>

<template>
  <div
    class="article-item block relative rounded-xl cursor-pointer"
    @click="showArticleDetail(article)"
  >
    <div class="mask">
      <div class="w-full h-full px-5 relative cover-article ">
        <img
          :src="article.cover||webInfoStore.getRandomAvatar()"
          width="100%"
          height="100%"
          class="cover rounded-t-2xl opacity-90"
          alt=""
        >
        <div class="article-date w-full px-6 flex justify-end items-end absolute bottom-1 right-7 left-6">
          <div
            v-if="article.createTime"
            class="flex"
          >
            <span><CalendarDaysIcon class="small" /></span>
            <span>{{ formatDateTime(article.createTime) }}</span>
          </div>
          <div
            v-else
            class="flex"
          >
            <span><RocketLaunchIcon class="small" /></span>
            <span>{{ formatDateTime(article.updateTime || "") }}</span>
          </div>
        </div>
      </div>
      <div class="label-category font-size-small flex opacity-0 absolute top-0 right-0">
        <div class="label-category-item backdrop-blur-2 rounded-full ml-1 article-text-hover">
          {{ article.labelName || "未分类" }}
        </div>
      </div>
    </div>
    <div class="article-info flex flex-col justify-center absolute  rounded-b-xl px-5">
      <div class="double-line font-semibold article-text-hover">
        {{ article.title }}
      </div>
      <div class="article-abstract rounded-b-xl">
        <p
          class="double-line article-text-hover"
          @click="showArticleDetail(article)"
        >
          {{ article.digest }}
        </p>
        <p
          class="double-line article-text-hover"
          @click="showArticleDetail(article)"
        >
          #{{ article.sortName || "暂无" }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  height: 200px;
  overflow: hidden;
}
.cover-article {
  transition: transform 0.3s ease; /* 添加过渡效果 */

  &:hover {
    transform: scale(1.1); /* 鼠标悬停时放大1.1倍 */
    ~.label-category .article-text-hover {
      color: var(--title-font-hover-color);
    }
    >.article-date{
      color: var(--title-font-hover-color) /* 添加这行 */
    }
  }
}
.article-text-hover:hover {
  color: var(--title-font-hover-color);
}
.article-item {
  width: 100%;
  height: 360px;
  padding-top: 20px;
  background-color: rgb(var(--z-common-bg),.7);

    .article-info {
      .article-date {
        display: none;
      }
      .article-abstract {
        line-height: 2;
        padding: 5px 1px 0;
      }
    }

    .label-category {
      opacity: 1;
      transition: all .3s;
    }
}

.article-abstract {
  line-height: 0;
}

.article-info {
  width: 100%;
  min-height: 90px;
  padding: 20px;
}

.article-date {
  width: auto;
  height: inherit;
  padding: 3px 5px;
  font-size: 80%;
  opacity: .7;
  color: rgb(var(--z-primary-fontcolor));
}

.label-category {
  right: 27px;
  top: 27px;
  color: rgb(var(--z-primary-fontcolor));

  .label-category-item {
    padding: 3px 9px;
    background-color: rgba(var(--z-basic-color), .4);
  }
}
</style>
