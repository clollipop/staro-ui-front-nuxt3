<script lang="ts" setup>
import '@/static/css/md-style.scss'
import {nextTick, onMounted, ref} from "vue";
import {formatDateTime, getAttribute, setAttribute, tocGenerate} from "@/static/modules/utils";
import {AuthorImpl} from "@/types/impl/author";
import ArticleColumn from "@/components/column/ArticleColumn.vue";
import {getArticleDetail} from "@/api/article";
import {useMenuStore} from "@/store/menuStore";
import Prism from "prismjs";
import {listColumnByArticleId} from "@/api/column";
import {useArticleStore} from "@/store/articleStore";
import {debounce} from "lodash";
import type {TocInterface} from "@/types/tocInterface";

const {path} = useRoute();
const menuState = useMenuStore();
const articleStore = useArticleStore();
// 配置菜单
menuState.setWithComment();
const {$viewport} = useNuxtApp();
const article = reactive<any>({});
const columnList = reactive([]);
const articleTocList = ref<any>([]);
const authorInfo = new AuthorImpl();
const nowIndex = ref(0);
const articleId = <string>path.split("/").pop();

// 获取评论
// await getColumnByArticleId(article.id);
// 初始化目录
const initToc = () => {
  articleTocList.value = tocGenerate("#article-content") as TocInterface[];
  articleStore.setTocList(articleTocList.value);
  articleStore.setSelectTitle(articleTocList.value[0]?.id);
};

/**
 * 切换底部相关专栏滑窗
 * @param page
 */
const switchColumn = (page: any) => {
  nowIndex.value = page.value - 1;
};

const getColumnByArticleId = async (articleId: string) => {
  const newColumn = await listColumnByArticleId(articleId);
  Object.assign(columnList, newColumn);
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

/**
 * 动态修改主题
 */
const setProperty = () => {
  const articleEle = document.getElementById("article");
  if (!!article.style) {
    articleEle!.style.setProperty("--z-article-bg", article.style);
  }
};

const initStyle = () => {
  const attribute = getAttribute("scroll");
  if (attribute !== "scroll") {
    setAttribute("scroll", "primary");
  }
};

useSeoMeta({
  title: () => `${article.title ?? authorInfo.siteName}`,
  description: () => `${article.description ?? authorInfo.description[1]}`
});
let scrollElement: any;

onMounted(() => {
  nextTick(debounce(async () => {
    await getArticleById(articleId);
    initToc();
    Prism.highlightAll();
    setProperty();
    initStyle();
    scrollElement = document.documentElement;
  }, 300));
});

onUnmounted(() => {
  // 重置toc
  articleStore.setTocList([]);
});
// const tocHandle = (e: MouseEvent, t: TocItem) => {
//   console.log(e);
//   console.log(t);
// };
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <div id="article" class="w-full">
    <div v-if="!article.title" id="show" class="w-full h-full">
      <Loading/>
    </div>
    <div v-else class="article__mask relative h-[60vh] mobile:h-[280px]">
      <div class="article-cover h-full absolute">
        <img :src="article.cover||article.videoUrl" alt="">
      </div>
      <div class="article__info w-full h-full absolute t-0 flex flex-col justify-center">
        <div class="article__info-title font-semibold leading-loose text-5xl mobile:text-2xl">
          {{ article.title }}
        </div>
        <div class="font-size-small flex flex-col">
          <span class="my-2">
            <span>创建时间：{{ formatDateTime(article?.createTime) }}</span>
            <span class="mx-2">|</span>
            <span>最后更新：{{ formatDateTime(article?.updateTime) }}</span>
          </span>
          <!--    分类      -->
          <span class="article-meta__sort">
            <span class="sort-column">分类:
              <span class="mr-1" style="color:#efdf00" v-for="(sort,index) in article.sortName" :key="index">{{ sort }}</span>
            </span>
          </span>
          <!--    标签      -->
          <span class="article-meta__label mt-2.5">
            <span class="sort-column">标签:
              <span class="mr-1" style="color:#efdf00"  v-for="(label,index) in article.labelName" :key="index">{{ label }}</span>
            </span>
          </span>
        </div>
      </div>
      <svg v-if="$viewport.isGreaterThan('mobileMedium')"
           class="article-waves w-full absolute bottom-0" preserveAspectRatio="none"
           shape-rendering="auto"
           viewBox="0 24 150 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path id="waves-gentle" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="waves-parallax">
          <use x="48" xlink:href="#waves-gentle" y="0"/>
          <use x="48" xlink:href="#waves-gentle" y="3"/>
          <use x="48" xlink:href="#waves-gentle" y="5"/>
          <use x="48" xlink:href="#waves-gentle" y="7"/>
        </g>
      </svg>
    </div>
    <div class="article__container flex justify-end w-full p-5 mb-5 mobile:p-0">

      <div class="article__content px-5 w-full">
        <!--   文章内容     -->
        <!--        <MdPreview class="article-content w-full rounded-t-xl leading-loose" editorId="preview-only"-->
        <!--                   :model-value="article.content"  :show-code-row-number="true"-->
        <!--        />-->
        <div id="article-content" class="article-content w-full rounded-t-xl leading-loose"
             v-html="article.content"
        ></div>

        <!--    复制协议    -->
        <div class="copyright my-5 p-5 rounded-b-xl">
          <p v-html="authorInfo.copyright"></p>
        </div>
        <!--   文章跳转     -->
        <div class="column-list flex flex-col overflow-hidden relative">
          <ArticleColumn
              v-for="(column, index) in columnList"
              v-show="index===nowIndex"
              :column="column"
          />
          <div class="w-full flex flex-row justify-center m-1">
            <OuoPagination v-if="columnList.length>=3" :total=3 :type="'dotted'" @onclick="switchColumn"/>
            <OuoPagination v-if="columnList.length===2" :total=2 :type="'dotted'" @onclick="switchColumn"/>
          </div>
        </div>
        <!--    评论     -->
        <div class="box mt-3">
          <!--<Comment/>-->
        </div>
      </div>

      <div class="article__aside box mobile:hidden">
        <!--目录-->
        <!--                <ClientOnly>-->
        <!--                  <md-catalog editorId="preview-only" :scrollElement="scrollElement" @click="tocHandle"/>-->
        <!--                </ClientOnly>-->
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
</template>

<style lang="scss" scoped>
#article {
  --z-article-bg: rgba(var(--z-primary-color), .8);
}

.article-content,
.copyright {
  background-color: rgb(var(--z-common-bg));
}

.article {
  &__mask {
    min-height: 390px;
    max-height: 450px;
    overflow: hidden;
    background: var(--z-article-bg);

    .article-cover {
      opacity: .999;
      width: 65%;
      right: 0;
      margin: 0 -20% 0 auto;
      transform: rotate(10deg) translateY(-10%) scale(2);
      filter: blur(10px);
    }
  }

  &__container {
    animation: bottom-top 1s;
  }

  &__content {
    .article-content {
      padding: 18px 25px;
      min-height: 50vh;
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
    height: -moz-fit-content;
    height: fit-content;
    max-height: calc(100vh - 100px);
    min-width: 200px;
    margin-left: 39px
  }

  @media (min-width: 1201px) {
    .article__aside {
      width: 17%;
      margin-left: 50px
    }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .article__aside {
      display: none
    }
  }

  @media (min-width: 0) and (max-width: 599px) {
    .article__aside {
      display: none
    }
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

.sort-category, .sort-column {
  padding: 4px 8px;
  margin-right: 6px;
  background: #ffffff52;
  border-radius: 5px;
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
</style>

<style lang="scss">
.article__content {
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
</style>