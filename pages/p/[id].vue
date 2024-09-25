<script lang="ts" setup>
import {MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import "@/static/css/md-style.scss";
import {nextTick, onMounted, reactive, ref} from "vue";
import {formatDateTime, getAttribute, setAttribute, tocGenerate} from "@/static/modules/utils";
import {AuthorImpl} from "@/types/impl/author";
import ArticleColumn from "@/components/column/ArticleColumn.vue";
import {addArticleViewCount, getArticleDetail} from "@/api/article";
import {useMenuStore} from "@/store/menuStore";
import {useArticleStore} from "@/store/articleStore";
import {debounce} from "lodash";
import { listTypeComment} from "@/api/comment";

const {path} = useRoute();
const menuState = useMenuStore();
const articleStore = useArticleStore();
// 配置菜单
menuState.setWithComment();
const {$viewport} = useNuxtApp();
const article = reactive<any>({});
const columnList = reactive([]);
const articleTocList = ref<any>(null);
const authorInfo = new AuthorImpl();
const nowIndex = ref(0);
const articleId = <string>path.split("/").pop();

// 切换底部相关专栏滑窗
const switchColumn = (page: any) => {
  nowIndex.value = page.value - 1;
};

// 获取与文章ID相关的专栏
const getColumnByArticleId = async (articleId: number) => {
  const newColumn = await listTypeComment(articleId,20);
  console.log("newColumn", newColumn);
  if (newColumn) {
    Object.assign(columnList, newColumn);
  }
};

// 获取文章数据
const getArticleById = async (path: string) => {
  const newArticle = await getArticleDetail(path);
  if (!newArticle || !newArticle.id) {
    goBack();
    return;
  }
  Object.assign(article, newArticle);
  return article;
};
// 增加阅读量
const addViewCount = async () => {
  await addArticleViewCount(article.id);
}
// 动态修改主题
const setProperty = () => {
  const articleEle = document.getElementById("article");
  if (article.style) {
    articleEle!.style.setProperty("--z-article-bg", article.style);
  }
};

const id = "preview-only";

// 初始化样式
const initStyle = () => {
  const attribute = getAttribute("scroll");
  if (attribute !== "scroll") {
    setAttribute("scroll", "primary");
  }
};


// SEO元数据设置
useSeoMeta({
  title: () => `${article.title ?? authorInfo.siteName}`,
  description: () => `${article.description ?? authorInfo.description[1]}`
});
// 初始化目录
// 自定义事件
const initToc = () => {
  document.addEventListener("contentLoaded", () => {
    articleTocList.value = tocGenerate("#preview-only-preview");
    articleStore.setTocList(articleTocList.value);
    articleStore.setSelectTitle(articleTocList.value[0]?.id);
  });
};

// 计算阅读时间
const countReadTime = () => {
  const time = article.content.length / 400;
  return "大约阅读 " + (Math.round(time) > 1 ? Math.round(time) : Math.round(time)) + " 分钟";
};
// 组件挂载完成后执行获取文章数据的操作
onMounted(() => {
  const event = new Event("contentLoaded");
  nextTick(debounce(async () => {
    await getArticleById(articleId);
    await getColumnByArticleId(articleId as any);
    await addViewCount();
    initToc();
    document.dispatchEvent(event);
    setProperty();
    initStyle();
    // 获取评论
  }, 300));
});
onUnmounted(() => {
  // 重置toc
  articleStore.setTocList([]);
});
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <div id="article" class="w-full">
    <Loading :show="!articleTocList"/>
    <div v-if="article.title" class="article__mask relative h-[60vh] mobile:h-[280px] text-center">
      <div class="article-cover h-full absolute">
        <img :src="article.cover || article.videoUrl" alt=""/>
      </div>
      <div class="article__info w-full h-full absolute t-0 flex flex-col justify-center">
        <div class="article__info-title font-semibold leading-loose text-5xl mobile:text-2xl">
          {{ article.title }}
        </div>
        <div class="font-size-small flex flex-col">
          <!--    创建时候和更新时间      -->
          <span class="my-2 article-time">
            <span>
              {{ formatDateTime(article?.createTime) }}
              <span style="margin-left: 2px;">
                : 发布时间
                <SvgIcon
                    style="font-size: 18px"
                    class="icon-rili"
                    icon="rili"
                />
              </span>
            </span>
            <span class="mx-2">|</span>
            <span>
              <SvgIcon
                  style="font-size: 16px"
                  class="icon-lishijilu"
                  icon="lishijilu"
              />
              更新时间：{{ formatDateTime(article?.updateTime) }}</span>
          </span>
          <!--     分类和标签     -->
          <span class="article-sort-label">
            <!--     分类       -->
            <span class="sort-column">
              <span style="color:#efdf00" v-for="(sort, index) in article.sortName" :key="index">
                {{ sort }}
              </span>
              <span style="margin-left: 2px;">
                : 分类
              <SvgIcon
                  style="font-size: 14px"
                  class="icon-fenlei1 article-tags text-sm text-gray-600"
                  icon="fenlei1"
              />
              </span>
            </span>
            <!--     间隔符       -->
            <span class="mx-2">|</span>
            <!--     标签       -->
            <span class="label-column">
              <SvgIcon
                  style="font-size: 16px"
                  class="icon-biaoqian1 article-tags text-sm text-gray-600"
                  icon="biaoqian1"
              />
              标签:
              <span class="mr-1" style="color:#efdf00" v-for="(label, index) in article.labelName" :key="index">
                {{ label }}
              </span>
            </span>
          </span>
          <!--     文字数量和阅读时间     -->
          <span class="my-2">
            <span>
              {{ countReadTime() }}
            <SvgIcon
                style="font-size: 18px"
                class="icon-yinliao"
                icon="yinliao"
            />
            </span>
            <!--     间隔符       -->
            <span class="mx-2">|</span>
             <span>
                <SvgIcon
                    style="font-size: 18px"
                    class="icon-jilu"
                    icon="jilu"
                />
              文章字数：{{ article.content.length }}
            </span>
          </span>
          <!--     阅读数     -->
          <span class="my-2">
            <span>
              <SvgIcon
                  style="font-size: 18px"
                  class="icon-yanjing"
                  icon="yanjing"
              />
              阅读数：{{ article.viewCount }}
            </span>
          </span>
        </div>
      </div>
      <!--   波浪   -->
      <div>
        <svg v-if="$viewport.isGreaterThan('mobileMedium')" class="article-waves w-full absolute bottom-0"
             preserveAspectRatio="none"
             shape-rendering="auto" viewBox="0 24 150 28" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path id="waves-gentle" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
          </defs>
          <g class="waves-parallax">
            <use x="48" xlink:href="#waves-gentle" y="0"/>
            <use x="48" xlink:href="#waves-gentle" y="3"/>
            <use x="48" xlink:href="#waves-gentle" y="5"/>
            <use x="48" xlink:href="#waves-gentle" y="7"/>
          </g>
        </svg>
      </div>
    </div>
    <div class="article__container rounded-tr-3xl">
      <div class="basic__container flex justify-center w-full">
        <div class="article__content ">
          <MdPreview id="article-content"
                     class="article-content w-full rounded-t-xl leading-loose"
                     :editorId="id"
                     :modelValue="article.content"
                     :code-theme="'gradient'"
                     theme="light"
                     previewTheme="arknights"
                     :showCodeRowNumber="true"
          />
          <!--     评论区     -->
          <div class="box mt-3 mb-2">
            <div>
              <Comment :comments="columnList"/>
            </div>
          </div>
          <!--    文章上下      -->
          <div class="column-list flex flex-col overflow-hidden relative">
            <ArticleColumn
                v-for="(column, index) in columnList"
                v-show="index === nowIndex"
                :column="column"
            />
            <div class="w-full flex flex-row justify-center m-1">
              <OuoPagination v-if="columnList.length >= 3" :total="3" :type="'dotted'" @onclick="switchColumn"/>
              <OuoPagination v-if="columnList.length === 2" :total="2" :type="'dotted'" @onclick="switchColumn"/>
            </div>
          </div>
          <!--     文章声明     -->
          <div class="copyright my-5 p-5 rounded-b-xl">
            <p v-html="authorInfo.copyright"></p>
          </div>
        </div>
        <!--   文章导航     -->
        <div class="article__aside box mobile:hidden">
          <ClientOnly>
            <div v-for="articleTocItem in articleTocList"
                 id="article-toc"
            >
              <TocItem :toc="articleTocItem"/>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#article {
  --z-article-bg: rgba(var(--z-primary-color), .8);
}

.article-content,
.copyright {
  background-color: rgb(var(--z-common-bg), 0.9);
}

.article {
  &__mask {
    min-height: 25vh;
    max-height: 35vh;
    overflow: hidden;
    background: var(--z-article-bg);
    border-radius: 0 0 10px 10px;

    .article-cover {
      opacity: .999;
      width: 70%;
      right: 0;
      margin: 0 -20% 0 auto;
      transform: rotate(10deg) translateY(40%) scale(2);
      filter: blur(10px);
    }
  }

  &__container {
    margin-top: 10px;
    animation: bottom-top 1s;
  }

  &__content {
    .article-content {
      padding: 18px 25px;
      min-height: 50vh;
      width: 100%;
      overflow-x: scroll;
      overflow-wrap: break-word;
    }

    .aside {
      top: 66px;
      display: none;

      &-item {
        width: 52px;
        height: 52px;
        left: -60px;
      }
    }
  }

  &__aside {
    top: 66px;
    position: sticky;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 23%;
    height: fit-content;
    max-height: calc(100vh - 100px);
    min-width: 200px;
    margin-left: 39px;
  }

  &__info {
    color: white;
    padding: 0 57px;
    background: rgba(48, 48, 115, .3);
  }
}

[data-theme="dark"] .article__mask {
  filter: brightness(0.9);
}

/* 文章分类标签*/
.article-sort-label {
  display: flex; /* 使用flex布局 */
  margin: 0 auto;

}

.sort-column {
  margin-right: 2px;
  text-align: right; /* 右对齐 */
}

.label-column {
  margin-left: 2px;
  text-align: left; /* 左对齐 */
}

.sort-column, .label-column {
  min-width: 100px;
  max-width: 1000px;
  width: 400px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}

.waves-parallax {
  &:nth-child(1) {
    fill: rgba(var(--z-basic-color), .7);
  }

  &:nth-child(2) {
    fill: rgba(var(--z-basic-color), .5);
  }

  &:nth-child(3) {
    fill: rgba(var(--z-basic-color), .3);
  }

  &:nth-child(3) {
    fill: rgb(var(--z-basic-color));
  }
}

@keyframes bottom-top {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    margin-top: 50px;
  }
  100% {
    opacity: 1;
    filter: none;
    margin-top: 0;
  }
}

.article__content {
  min-width: 55vw;
  width: 90vh;
  max-width: 60vw;

  a {
    padding: 0 3px;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 2px dotted rgba(var(--z-fontcolor-gray), 1);
    border-radius: 3px 3px 0 0;
    transition: all .2s;

    &:hover {
      padding: 1px 3px;
      color: rgb(var(--z-basic-color));
      background: rgba(var(--z-primary-color), .7);
      border-width: 0;
      border-radius: 3px;
    }
  }
}

.comment {
  &-head {
    height: 7px;
  }

  &-headline {
    display: none;
  }
}

.ouo-pagination__item.inactive {
  background-color: rgba(var(--ouo-primary-color), .1) !important;
  border: 1px solid rgb(var(--z-basic-input-color));
}

.basic__container {
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .article__content {
    width: 50vh !important;
    min-height: 50vh !important;
    max-width: 52vh !important;
  }
  .article-content {
    width: 45vh !important;
    margin: 0 auto;
    min-height: 50vh !important;
    max-width: 52vh !important;
  }
  .article-time {
    width: 330px;
  }
  .sort-column{
    width: 154px;
  }
}

::v-deep(.md-editor .md-editor-preview) {
  --md-color: var(--z-action-color) !important;
}

/* 波浪效果 黑夜*/
[data-theme="dark"] .waves-parallax {
  &:nth-child(1) {
    fill: rgba(167, 177, 190, 0.7); /* 第一层波浪 */
  }

  &:nth-child(2) {
    fill: rgba(167, 177, 190, 0.5); /* 第二层波浪 */
  }

  &:nth-child(3) {
    fill: rgba(167, 177, 190, 0.3); /* 第三层波浪 */
  }

  &:nth-child(4) {
    fill: rgb(167, 177, 190); /* 第四层波浪 */
  }
}
</style>
