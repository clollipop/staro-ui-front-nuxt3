<script setup lang="ts">
import {OuOPagination} from "@/static/modules/ouo";
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
        <OuOPagination
          v-if="totalPage > 1"
          :total="totalPage"
          @onclick="switchPage"
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

<style lang="scss">
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
    flex-direction: column; /* 让文章和侧边栏在手机上纵向排列 */
    padding: 10px; /* 调整内边距 */
  }

  .profile-card-container {
    width: 100%; /* 使侧边栏在手机上占满宽度 */
    margin-right: 0; /* 移除右边距 */
    margin-bottom: 20px; /* 为侧边栏和文章之间添加下边距 */
  }

  .article-list-container {
    padding: 0 50px; /* 调整文章列表的内边距 */
  }

  .grid.auto-grid {
    grid-template-columns: 1fr; /* 在小屏幕下使用单列布局 */
    gap: 15px; /* 调整间距 */
  }
}
</style>