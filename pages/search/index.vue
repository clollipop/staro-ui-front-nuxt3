<script lang="ts" setup>
import ArticleItem from "@/components/list/ArticleItem.vue";
import {useSearchStore} from "@/store/searchStore";
import {searchAll, type SearchDTO, SearchType} from "@/api/search";
import {goBack} from "@/utils/utils";
import {Search} from "@element-plus/icons-vue";

const searchStore = useSearchStore();

const searchList = ref([]) as any;
const showLoading = ref(false);

/**
 * 数据获取
 */
nextTick(async () => {
  await searchArticleList(searchStore.keyword, 1);
});

async function searchArticleList(keyword: string, pagination: number) {
  console.log("searchArticleList", keyword, pagination);
  if (!searchStore.keyword) {
    goBack();
    return;
  }
  const params: SearchDTO = {
    pageNo: pagination,
    title: "",
    content: "",
    contentHtml: "",
    type: 0
  };
  const type = searchStore.type;
  showLoading.value = true;
  let newSearchList = null;
  if (type === "content") {
    params.content = keyword;
    params.type = SearchType.Content;
    newSearchList = await searchAll(params);
  } else if (type === "title") {
    params.type = SearchType.Title;
    params.title = keyword;
    newSearchList = await searchAll(params);
  } else if (type === "all") {
    params.type = SearchType.All;
    params.title = keyword;
    params.content = keyword;
    newSearchList = await searchAll(params);
  }
  searchList.value = unref(newSearchList?.list);
  
  showLoading.value = false;
}

/**
 * 监听搜索关键词变化
 */
// searchStore.$subscribe((mutation, state) => {
//   searchArticleList(state.marking, 1);
// });

useSeoMeta({
  title: "搜索",
  description: "搜索页"
});
</script>

<template>
  <div
    id="main"
    class="page flex"
  >
    <div
      v-show="showLoading"
      class="w-full h-full"
    >
      <Loading />
    </div>
    <div class="page-content w-full">
      <div>
        <el-input
          v-model="searchStore.keyword"
          style="height: 50px;"
          class="title tag-item"
          size="large"
          placeholder="搜索文章"
        >
          <template #append>
            <el-button
              :icon="Search"
              @click="searchArticleList(searchStore.keyword, 1)"
            />
          </template>
        </el-input>
      </div>
      <div class="grid auto-grid gap-7 gap-y-5 pc:gap-5 mt-7">
        <div
          v-if="!searchList||searchList.length<=0"
          class="text-center"
        >
          什么也没有搜索到（⊙ｏ⊙）
        </div>
        <div
          v-for="article in searchList"
          :key="article.id"
        >
          <ArticleItem :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.el-input__wrapper.is-focus){
  box-shadow: 0 0 0 1px var(--z-search-fontcolor) inset;
}
</style>