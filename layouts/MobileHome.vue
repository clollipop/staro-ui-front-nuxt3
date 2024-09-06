<template>
  <div>
    <div class="w-full">
      <Header />
    </div>
    <main id="main">
      <Post />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
#main {
  margin-top: var(--z-header-height);
}
</style>