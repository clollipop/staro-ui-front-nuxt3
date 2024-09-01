<script setup lang="ts">
import {OuOPagination, OuOTag} from "@/static/modules/ouo";
import {useMenuStore} from "@/store/menuStore";
import {listArticle} from "@/api/article";
import ArticleItem from "@/components/list/ArticleItem.vue";

const menuState = useMenuStore();

const list = ref<any>([]);
const totalPage = ref(0);
const lastPagination = ref(0);


async function getArticleList(pagination: number) {
  const data = await listArticle(pagination);
  list.value = data.list;
  totalPage.value = Math.floor(Number.parseInt(data.total) / 10) + 1;
}

async function switchPage(pagination: any) {
  const newPagination = pagination.value;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > totalPage) {
    return;
  }
  lastPagination.value = newPagination;
  await getArticleList(newPagination);
}

onMounted(async () => {
  menuState.setWithoutComment();
  await nextTick(() => {
    getArticleList(1);
  });
});
</script>

<template>
  <div id="post">
    <div class="box-header flex justify-between">
<!--      <div class="filter flex">-->
<!--        <OuOTag-->
<!--          class="mr-2"-->
<!--          :size="'small'"-->
<!--          :checked="true"-->
<!--          @click="getArticleList(1)"-->
<!--        >-->
<!--          全部文章-->
<!--        </OuOTag>-->
<!--      </div>-->
    </div>
    <div class="grid auto-grid gap-9 gap-y-7 pc:gap-5 screen cursor-pointer">
      <div
        v-for="article in list"
        :key="article.id"
      >
        <ArticleItem :article="article" />
      </div>
    </div>
    <div class="pagination flex justify-center w-full mt-4">
      <OuOPagination
        v-if="totalPage>1"
        :total="totalPage"
        @onclick="switchPage"
      />
    </div>
  </div>
</template>

<style lang="scss">
#post {
  padding: 10px 8vw;
}

.pagination {
  color: rgb(var(--z-fontcolor-gray));
}
</style>
