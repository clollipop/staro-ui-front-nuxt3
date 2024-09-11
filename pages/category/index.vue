<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {OuOLanding} from "@/static/modules/ouo";
import {listSort} from "@/api/sort";
import {listLabelBySortId} from "@/api/label";
import ColumnItem from "@/components/list/ColumnItem.vue";
import {debounce} from "lodash";
import {formatDateTime} from "~/static/modules/utils";

const sortList = ref<any>([]);
const labelList = ref<any>([]);
const {$viewport} = useNuxtApp();
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
  labelList.value = unref(newColumnList);
}

const safeGetLabelListBySortId = debounce(getLabelListBySortId, 10);
useSeoMeta({
  title: "分类",
  description: "分类页"
});

// 点击处理逻辑
function handleSortClick(sortId: string) {
  activeSort.value = sortId; // 设置活动状态
  safeGetLabelListBySortId(sortId, 1); // 调用获取标签列表
}
</script>

<template>
  <div>
    <div class="w-full">
      <Header />
    </div>
    <!--  封面标题  -->
    <div class="sort_mask relative h-[30vh] mobile:h-[280px]">
      <div class="article-cover h-full absolute" />
      <div class="article__info w-full h-full absolute t-0 flex flex-col justify-center">
        <div class="article__info-title font-semibold leading-loose text-5xl mobile:text-2xl text-center">
          分类
        </div>
        <div class="font-size-small flex flex-col">
          <span class="my-2" />
        </div>
      </div>
      <svg
        v-if="$viewport.isGreaterThan('mobileMedium')"
        class="article-waves w-full absolute bottom-0"
        preserveAspectRatio="none"
        shape-rendering="auto"
        viewBox="0 24 150 28"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            id="waves-gentle"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="waves-parallax">
          <use
            x="48"
            xlink:href="#waves-gentle"
            y="0"
          />
          <use
            x="48"
            xlink:href="#waves-gentle"
            y="3"
          />
          <use
            x="48"
            xlink:href="#waves-gentle"
            y="5"
          />
          <use
            x="48"
            xlink:href="#waves-gentle"
            y="7"
          />
        </g>
      </svg>
    </div>

    <div
      id="main"
      class="page  flex"
    >
      <div class="page-content w-full">
        <div
          v-if="sortList.length > 0"
          class="box-header"
        >
          <el-button
            :class="['custom-tag-button', 'mr-1', { active: activeSort === '' }]"
            @click="handleSortClick('')"
          >
            全部
          </el-button>
          <el-button
            v-for="sort in sortList"
            :key="sort.id"
            :class="['custom-tag-button', 'mr-1', { active: activeSort === sort.id }]"
            @click="handleSortClick(sort.id)"
          >
            {{ sort.name }}
          </el-button>
        </div>
        <div class="sort-label grid label-grid gap-6 gap-y-4 pc:gap-4">
          <ColumnItem
            v-for="label in labelList"
            :key="label.id"
            :label="label"
          />
        </div>
      </div>
      <!--  侧边栏 信息    -->
      <Sidebar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  margin: 0 5px;
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
</style>


