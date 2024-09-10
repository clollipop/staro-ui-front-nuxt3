<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { OuOLanding, OuOTag } from "@/static/modules/ouo";
import { listSort } from "@/api/sort";
import { listLabelBySortId } from "@/api/label";
import ColumnItem from "@/components/list/ColumnItem.vue";
import { debounce } from "lodash";

const sortList = ref<any>([]);
const labelList = ref<any>([]);

const activeSort = ref<string | null>(null); // 管理活动分类状态

onMounted(() => {
  nextTick(async () => {
    await getSortList();
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
    <OuOLanding />
    <div
      id="main"
      class="page flex"
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
.label-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
</style>


