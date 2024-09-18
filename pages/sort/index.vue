<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {listSort} from "@/api/sort";
import {listLabelBySortId} from "@/api/label";
import ColumnItem from "@/components/list/ColumnItem.vue";
import {debounce} from "lodash";

const sortList = ref<any>([]);
const labelList = ref<any>([]);
const labelTotal = ref(0);
const activeSort = ref<string | null>(null); // 管理活动分类状态
onMounted(() => {
  nextTick(async () => {
    await getSortList();
    handleSortClick("");
  });
});

/**
 * 分类列表
 */
async function getSortList() {
  const newSortList = await listSort();
  sortList.value = unref(newSortList);
}

/**
 * 标签列表
 * @param sortId
 * @param pagination
 */
async function getLabelListBySortId(sortId: string, pagination: number) {
  const newColumnList = await listLabelBySortId(sortId, pagination);
  labelList.value = unref(newColumnList.list);
  labelTotal.value = unref(newColumnList.total);
}

const safeGetLabelListBySortId = debounce(getLabelListBySortId, 10);
useSeoMeta({
  title: "分类",
  description: "分类页"
});

// 点击处理逻辑
async function handleSortClick(sortId: string) {
  activeSort.value = sortId; // 设置按钮状态
  await safeGetLabelListBySortId(sortId, 1); // 调用获取标签列表
}
// 分页
const lastPagination = ref(0);
async function switchPage(pagination: any) {
  const newPagination = pagination;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > labelTotal.value) {
    return;
  }
  lastPagination.value = newPagination;
  await safeGetLabelListBySortId(activeSort.value||"" ,newPagination);
}
const {$viewport} = useNuxtApp();
</script>

<template>
  <div>
    <div class="w-full">
      <Header />
    </div>
    <!--  标题封面  -->
    <title-cover
      :title="'分类'"
    />
    <!--  内容  -->
    <div
      id="main"
      class="page flex"
    >
      <div class="page-content w-full">
        <div class="scrollable .custom-tag-button box-header">
          <div
            v-if="sortList.length > 0"
            class="box-header"
          >
            <el-button
              :class="['custom-tag-button', { active: activeSort === '' }]"
              @click="handleSortClick('')"
            >
              全部
            </el-button>
            <el-button
              v-for="sort in sortList"
              :key="sort.id"
              :class="['custom-tag-button', { active: activeSort === sort.id }]"
              @click="handleSortClick(sort.id)"
            >
              {{ sort.name }}
            </el-button>
          </div>
        </div>
        <!--  分类列表  -->
        <div class="sort-label grid label-grid gap-6 gap-y-4 pc:gap-4">
          <ColumnItem
            v-for="label in labelList"
            :key="label.id"
            :label="label"
          />
        </div>
        <div class="flex justify-center items-center mt-10">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="12"
            :total="labelTotal"
            @current-change="switchPage"
          />
        </div>
      </div>
      <!--  侧边栏 信息    -->
      <div
        v-if="!$viewport.isLessThan('tablet')"
        class="profile-card-container"
      >
        <ProfileCard />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/static/css/elementPlus.scss";
.page{
 padding-top: 10px;
}
.sort_mask{
  min-height: 300px;
  max-height: 450px;
  overflow: hidden;
  background: var(--z-article-bg);
  border-radius: 0 0 10px 10px;
}
.label-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.page-content{
  padding: 20px 30px;
  border-radius: 10px;
  --z-bg: linear-gradient(to top right, rgba(var(--z-primary-color)), rgba(var(--z-primary-color), .8), rgba(var(--z-primary-color), .5) 150%);
  background-color: rgba(var(--z-global-bg), .9);
}
.custom-tag-button {
  border: 0;
  margin: 2px 5px;
  background-color: #f9f9f9; /* 更柔和的背景色 */
  color: #333; /* 深灰色文本 */
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  transition: background-color 0.3s ease,
  color 0.3s ease,
  box-shadow 0.3s ease,
  transform 0.3s ease; /* 添加动画过渡 */
  text-transform: capitalize;
  transform: translateY(-3px);
}

/* 鼠标悬停效果 */
.custom-tag-button:hover {
  background-color: #e0e0e0; /* 悬停效果的更淡颜色 */
}

/* 点击后的效果 */
.custom-tag-button.active {
  background-color: rgb(var(--z-primary-color));
  color: white; /* 白色文本 */
  box-shadow: 0 10px 10px rgba(var(--z-primary-color), 0.3); /* 柔和的阴影 */
  transform: translateY(-5px); /* 活动状态下稍微向上移动 */
}

.custom-tag-button:active {
  background-color: rgb(var(--z-primary-color));
  color: white; /* 保持白色文本 */
  box-shadow: 0 10px 10px rgba(var(--z-primary-color), 0.3);
  transform: translateY(-2px); /* 点击时轻微向下移动 */
}
.profile-card-container {
  margin-left: 20px;
}
/*分类按钮 超出宽度 滚动条*/
.scrollable {
  display: flex;  /* 使用 flexbox 布局 */
  overflow-x: auto;  /* 允许横向滚动 */
  white-space: nowrap;  /* 防止内容换行 */
  padding: 10px 0;  /* 可选，增加上下内边距 */
}

.custom-tag-button {
  margin-right: 10px;
}

.box-header {
  flex-shrink: 0;
}

</style>


