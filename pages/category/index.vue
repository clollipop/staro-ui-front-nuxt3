<script lang="ts" setup>
import {OuOLanding, OuOTag} from "@/static/modules/ouo";
import type {CategoryMap} from "@/types/categoryInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import {listCategory} from "@/api/category";
import {listColumnByCategoryId} from "@/api/column";
import ColumnItem from "@/components/list/ColumnItem.vue";

const categoryList = ref<CategoryMap[]>([]);
const columnList = ref<PreviewColumn[]>([]);

getCategoryList();

async function getCategoryList() {
  const newCategoryList = await listCategory();
  categoryList.value = unref(newCategoryList);
}

async function getColumnListByCategoryId(categoryId: string, pagination: number) {
  const newColumnList = await listColumnByCategoryId(categoryId, pagination);
  columnList.value = unref(newColumnList);
}

useSeoMeta({
  title: "分类",
  description: "分类页"
});
</script>

<template>
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
        v-if="categoryList.length>0"
        class="box-header"
      >
        <OuOTag
          v-for="category in categoryList"
          :key="category.id"
          :size="'small'"
          class="mr-2"
          @click="getColumnListByCategoryId(category.id, 1)"
        >
          {{ category.name }}
        </OuOTag>
      </div>
      <div class="category-column grid column-grid gap-6 gap-y-4 pc:gap-4">
        <ColumnItem
          v-for="column in columnList"
          :key="column.id"
          :column="column"
        />
      </div>
    </div>
    <Sidebar />
  </div>
</template>
