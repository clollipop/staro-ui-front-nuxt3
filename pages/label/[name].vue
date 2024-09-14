<script lang="ts" setup>
import {getLabelInfo} from "~/api/label";
import { listArticleByLabelId} from "@/api/article";
import type {Article} from "@/types/articleInterface";
import CategoryItem from "@/components/list/CategoryItem.vue";
import ArticleItem from "@/components/list/ArticleItem.vue";
import {getAttribute, setAttribute} from "@/static/modules/utils";

const {path} = useRoute();

const articleList = ref<Article[]>([]);
const columnInfo = reactive<any>({});
const previewColumn = ref<any>();

const articlePath = <string>path.split("/").pop();

async function getLabelInfoById(labelId: number) {
  const newColumnInfo = await getLabelInfo(labelId);
  console.log(newColumnInfo);
  previewColumn.value = unref(newColumnInfo);
  columnInfo.title = newColumnInfo.name;
  columnInfo.description = newColumnInfo.description;
  // columnInfo.thumbnail = newColumnInfo.thumbnail;
  // columnInfo.style = newColumnInfo.style;
  columnInfo.thumbnail = "https://s.ahzoo.cn/demo/img/82.png";
  columnInfo.style = "linear-gradient(to top right, #BB63BD, #4C71C1, #CEDFF4 150%)";
  return newColumnInfo;
}

async function getArticleListByLabelId(labelId: number, pagination: number) {
  const newArticleList = await listArticleByLabelId(labelId, pagination);
  articleList.value = unref(newArticleList);
}

function initStyle() {
  const attribute = getAttribute("scroll");
  if (attribute !== "scroll") {
    setAttribute("scroll", "primary");
  }
}

useSeoMeta({
  title: () => `${columnInfo.title ?? "专栏"}`,
  description: () => `${columnInfo.description ?? "专栏页"}`
});

onMounted( () => {
  initStyle();
  nextTick( async () => {
    const labelInfoTemp = await getLabelInfoById(Number(articlePath));
    await getArticleListByLabelId(labelInfoTemp.id, 1);
  });
});
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <!-- label 信息 -->
  <div id="column-info" class="mb-2 mobile:hidden">
    <!--  标题封面  -->
    <title-cover
        :title="columnInfo.title"
        :subtitle="columnInfo.description"
    />
  </div>
  <!-- label 文章列表 -->
  <div id="main" class="page flex">
    <div class="page-content w-full">
      <div class="grid auto-grid gap-7 gap-y-5 pc:gap-5">
        <div v-for="article in articleList">
          <ArticleItem :article="article"/>
        </div>
      </div>
    </div>
    <Sidebar/>
  </div>
</template>

<style lang="scss" scoped>
</style>
