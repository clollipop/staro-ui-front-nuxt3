<script lang="ts" setup>
// 导入PC端和移动端的页面组件
import PCPage from "@/layouts/PcHome.vue";
import MobilePage from "@/layouts/MobileHome.vue";
// 获取Nuxt应用实例中的$viewport对象
const {$viewport} = useNuxtApp();
</script>

<template>
  <div>
    <!-- 根据视口大小选择显示移动端或PC端页面 -->
    <div v-if="$viewport.isLessThan('tablet')">
      <!-- 如果视口小于平板尺寸，显示移动端页面 -->
      <MobilePage />
    </div>
    <div v-else>
      <!-- 否则，显示PC端页面 -->
      <PCPage />
    </div>
  </div>
</template>

<style lang="scss">
/* 设置主内容区域的上下内边距 */
main {
  padding: 10px 0;
}
</style>
