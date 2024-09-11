<script lang="ts" setup>
import {getLabelInfo} from "~/api/label";
import {listArticleByColumnId} from "@/api/article";
import type {Article} from "@/types/articleInterface";
import type {WebInfoInterface} from "@/types/webInfoInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import CategoryItem from "@/components/list/CategoryItem.vue";
import ArticleItem from "@/components/list/ArticleItem.vue";
import {getAttribute, setAttribute} from "@/static/modules/utils";

const {path} = useRoute();

const articleList = ref<Article[]>([]);
const columnInfo = reactive<WebInfoInterface>({
  title: ""
});
const previewColumn = ref<PreviewColumn>();

const articlePath = <string>path.split("/").pop();
const columnInfoTemp: PreviewColumn = await getColumnInfoByName(Number(articlePath));
await getArticleListByColumnId(columnInfoTemp.id, 1);

async function getColumnInfoByName(labelId: number) {
  const newColumnInfo = await getLabelInfo(labelId);
  previewColumn.value = unref(newColumnInfo);
  columnInfo.title = newColumnInfo.name;
  columnInfo.thumbnail = newColumnInfo.thumbnail;
  columnInfo.description = newColumnInfo.description;
  columnInfo.style = newColumnInfo.style;
  return newColumnInfo;
}

async function getArticleListByColumnId(columnId: string, pagination: number) {
  const newArticleList = await listArticleByColumnId(columnId, pagination);
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

onMounted(() => {
  initStyle();
});
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <div id="column-info" class="mb-2">
    <Landing :landing="columnInfo">
      <CategoryItem v-for="category in previewColumn?.categoryList"
                    :category="category" :style="columnInfo.style"
      />
    </Landing>
  </div>
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
