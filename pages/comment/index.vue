<script lang="ts" setup>
import Comment from "@/components/comment/index.vue";

const comment = ref();

useSeoMeta({
  title: "留言",
  description: "留言页"
});
</script>

<template>
  <div>
    <div
      id="main"
      class="page flex"
    >
      <div class="comment-content w-full p-5 rounded-lg">
        <Comment />
      </div>
      <Sidebar />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.comment-content {
  height: 100vw;
  background: rgba(var(--z-common-bg), .6);
}
</style>
