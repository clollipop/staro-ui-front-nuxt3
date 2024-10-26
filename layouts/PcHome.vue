<script setup lang="ts">

onMounted(() => {
  const primary = document.getElementById("primary");
  primary!.style.backgroundColor = "transparent";
});

onBeforeUnmount(() => {
  const primary = document.getElementById("primary");
  // primary!.style.backgroundColor = "rgba(var(--z-global-bg), .7)";
});
</script>

<template>
  <div>
    <Welcome />
    <main id="main">
      <Post />
    </main>
  </div>
</template>
