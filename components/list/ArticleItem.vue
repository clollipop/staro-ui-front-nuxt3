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
    class="article-item relative rounded-xl overflow-hidden cursor-pointer"
    @click="showArticleDetail(article)"
  >
    <div class="cover-article">
      <div class="overlay-article" />
      <img
        :src="article.cover || webInfoStore.getRandomAvatar()"
        class="cover"
        alt=""
      >
      <div class="title-overlay">
        <div class="title">
          {{ article.title }}
        </div>
      </div>
    </div>
    <div class="article-info h-36 w-auto flex flex-col items-center p-5 rounded-b-2xl shadow-lg">
      <div class="double-line font-semibold mb-1 line-clamp-2">
        {{ article.digest }}
      </div>
      <div class="flex items-center text-gray-600 mb-2">
        <CalendarDaysIcon class="icon" />
        <span style="color: red">{{ formatDateTime(article.createTime) }}</span>
        <RocketLaunchIcon class="icon ml-4" />
        <span>{{ formatDateTime(article.updateTime || "") }}</span>
      </div>
      <div class="article-tags text-sm text-gray-600">
        <p>{{ article.sortName || "暂无" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item {
  width: 100%;
  max-width: 300px;
  transition: transform 0.3s ease;
  background: rgba(var(--z-global-bg),0.9);
  &:hover {
    transform: translateY(-5px);
  }
}

.cover-article {
  position: relative;
  height: 200px;
  overflow: hidden;
  clip-path: polygon(0 0, 105% 0, 100% 60%, 50% 100%, 0 60%); /* V 形遮罩 */

  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .overlay-article {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2); /* 调整透明度 */
    z-index: 1; /* 确保遮罩在图片上方 */
  }
}

.title-overlay {
  position: absolute;
  top: 30px; /* 更接近底部 */
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  z-index: 2; /* 确保标题在遮罩上方 */
}

.title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.article-info {
  padding: 1rem;
  color: #1f2d3d;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .icon {
    width: 1em;
    height: 1em;
    margin-right: 5px;
  }

  .double-line {
    font-size: 1rem;
  }

  .article-tags {
    margin-top: 0.5rem;
    color: #666;
  }
}
</style>
