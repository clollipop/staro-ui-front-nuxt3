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
    <div class="w-full">
      <Header />
    </div>
    <!--    <OuOLanding />-->
    <Welcome />
    <main id="main">
      <Post />
    </main>
  </div>
</template>
