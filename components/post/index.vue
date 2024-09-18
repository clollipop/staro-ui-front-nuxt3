<script setup lang="ts">
import {useMenuStore} from "@/store/menuStore";
import {listArticle} from "@/api/article";
import ArticleItem from "@/components/list/ArticleItem.vue";

const {$viewport} = useNuxtApp();
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
  const newPagination = pagination;
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
  <div
    id="post"
    class="flex"
  >
    <div class="article-list-container flex-grow">
      <div class="box-header flex justify-between" />
      <div class="grid auto-grid gap-9 gap-y-7 pc:gap-5 screen">
        <div
          v-for="article in list"
          :key="article.id"
        >
          <ArticleItem :article="article" />
        </div>
      </div>
      <div class="pagination flex justify-center w-full mt-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="12"
          :total="totalPage"
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
#post {
  display: flex;
  padding: 10px 5vw;
}

.profile-card-container {
  width: 250px;
}

.article-list-container {
  flex-grow: 1; // 允许文章列表占用剩余空间
}

// 原有文章列表样式
.pagination {
  color: rgb(var(--z-fontcolor-gray));
}

// 媒体查询：针对手机和小屏幕进行优化
@media (max-width: 768px) {
  #post {
    flex-direction: column;
    padding: 10px;
  }

  .profile-card-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .article-list-container {
    padding: 0 50px;
  }

  .grid.auto-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>