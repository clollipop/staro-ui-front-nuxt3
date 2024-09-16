<script setup lang="ts">
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
      <!--   标题   -->
      <div class="title-overlay">
        <div
          class="title line-clamp-2"
          :title=" article.title "
        >
          {{ article.title }}
        </div>
      </div>
    </div>
    <div class="article-info h-36 w-auto flex flex-col items-center p-5 rounded-b-2xl shadow-lg">
      <!--  时间    -->
      <div class="date-info flex  justify-between text-gray-600 mb-2">
        <span class="text-center">
          <p>
            <SvgIcon
              class="icon-rili"
              icon="rili"
            />
            发布于
          </p>

          {{ formatDateTime(article.createTime, 1) }}
        </span>
        <span class="text-center">
          <p>
            <SvgIcon
              style="font-size: 14px"
              class="icon-lishijilu"
              icon="lishijilu"
            />
            更新于
          </p>
          {{ formatDateTime(article.updateTime || "", 1) }}
        </span>
      </div>
      <!--  摘要    -->
      <div
        class="digest"
      >
        <text-ellipsis>
          {{
            article.digest || "暂无摘要"
          }}
        </text-ellipsis>
      </div>
      <p class="mt-3 w-full  line-clamp-2">
        <!--  是否置顶    -->
        <span v-if="article.recommendStatus">
          <SvgIcon
            style="font-size: 14px"
            class="icon-tuding article-tags text-sm text-gray-600"
            icon="tuding"
          />
          置顶
        </span>
        <!--  间隔符      -->
        <span
          v-if="article.recommendStatus"
          class="text-gray-600 mx-1"
        >|</span>
        <!--  分类    -->
        <span class="article-tags text-sm text-gray-600">
          <span>
            <SvgIcon
              style="font-size: 14px"
              class="icon-fenlei1 article-tags text-sm text-gray-600"
              icon="fenlei1"
            />
            <span
              v-for="(tag, index) in article.sortName"
              :key="index"
              class="ml-1"
            >
              {{ index > 0 ? " • "+tag: tag|| "暂无" }}
            </span>
          </span>
        </span>
        <!--  间隔符      -->
        <span
          class="text-gray-600 mx-1"
        >|</span>
        <!--  标签    -->
        <span class="article-tags text-sm text-gray-600">
          <span>
            <SvgIcon
              style="font-size: 14px"
              class="icon-biaoqian1 article-tags text-sm text-gray-600"
              icon="biaoqian1"
            />
            <span
              v-for="(tag, index) in article.labelName"
              :key="index"
              class="ml-1"
            >
              {{ index > 0 ? " • "+tag: tag|| "暂无" }}
            </span>
          </span>
          <!--    分隔符      -->
          <span
            class="text-gray-600 mx-1"
          >|</span>
          <!--    评论      -->
          <span>
            <SvgIcon
              style="font-size: 14px"
              class="icon-shequpinglun article-tags text-sm text-gray-600"
              icon="shequpinglun"
            />
            0 条评论
          </span>
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item {
  width: 100%;
  max-width: 290px;
  border: 1px solid rgb(255,255,255); /*border为2*/
  transition: transform 0.3s ease;
  background: rgba(var(--z-global-bg), 0.9);

  &:hover {
    transform: translateY(-5px);
    border: 1px solid rgb(255,255,255); /*border为2*/

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
  top: 30%;
  left: 50%;
  width: 17em;
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
  color: #969797;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .icon {
    width: 1em;
    height: 1em;
    margin-right: 5px;
  }

  .double-line {
    font-size: 1rem;
    line-height: 1.5;
    width: 50%;
  }
}

.date-info {
  position: absolute;
  bottom: 35%;
  left: 1px;
  right: 5px;
  z-index: 3;
  padding: 5px;
  border-radius: 4px;
}

.digest {
  display: flex;
  width: 260px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 520;
  line-height: 1.5;
  text-align: justify;
  justify-content: center;
  &:hover {
    color: #409eff;
  }
}
</style>
