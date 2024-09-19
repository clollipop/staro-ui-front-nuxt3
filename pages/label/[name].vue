<script lang="ts" setup>
import {getLabelInfo} from "~/api/label";
import { listArticleByLabelId} from "@/api/article";
import type {Article} from "@/types/articleInterface";
import ArticleItem from "@/components/list/ArticleItem.vue";
import {getAttribute, setAttribute} from "@/static/modules/utils";
import {ref} from "vue";
const {$viewport} = useNuxtApp();
const {path} = useRoute();

const articleList = ref<Article[]>([]);
const columnInfo = reactive<any>({});
const previewColumn = ref<any>();

const articlePath = <string>path.split("/").pop();

async function getLabelInfoById(labelId: number) {
  const newColumnInfo = await getLabelInfo(labelId);
  previewColumn.value = unref(newColumnInfo);
  columnInfo.title = newColumnInfo.name;
  columnInfo.description = newColumnInfo.description;
  return newColumnInfo;
}
const labelTotal = ref<number>(0);
const lastPagination = ref(0);
const newLabelId = ref(0);
async function getArticleListByLabelId(labelId: number, pagination: number) {
  const newArticleList = await listArticleByLabelId(labelId, pagination);
  articleList.value = unref(newArticleList.list);
  labelTotal.value = unref(newArticleList.total);
  newLabelId.value = labelId;
}
// 分页切换点击
async function switchPage(pagination: any) {
  const newPagination = pagination;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > lastPagination.value) {
    return;
  }
  lastPagination.value = newPagination;
  await getArticleListByLabelId(newLabelId.value,newPagination);
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
  <div id="main" class="flex">
    <div class="page-content w-full">
      <div class="grid auto-grid gap-9 gap-y-7 pc:gap-5 screen">
        <div v-for="article in articleList">
          <ArticleItem :article="article"/>
        </div>
      </div>
      <div class="pagination flex justify-center w-full mt-4">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="12"
            :total="labelTotal"
            @current-change="switchPage"
        />
      </div>
    </div>
    <div
        v-if="!$viewport.isLessThan('tablet')"
        class="profile-card-container"
    >
      <ProfileCard />
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "@/static/css/elementPlus.scss";
#main {
  padding: 10px 5vw;
}
</style>
