<template>
  <!--  封面标题  -->
  <div class="mask relative h-[30vh] mobile:h-[280px]">
    <div class="title-cover h-full absolute" />
    <div class="title-info w-full h-full absolute t-0 flex flex-col justify-center ss-font">
      <div class="article__info-title font-semibold leading-loose text-5xl text-center">
        <div class="font-semibold text-5xl leading-loose mobile:text-2xl">
          {{ props?.title }}
        </div>
        <div class="font-size-x-large mobile:text-xl mt-2">
          {{ props?.subtitle }}
        </div>
      </div>
      <div class="font-size-small flex flex-col">
        <span class="my-2" />
      </div>
    </div>
    <svg
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
</template>
<script setup lang="ts">

const props = defineProps({
  title: String,
  subtitle: String
});
</script>
<style lang="scss" scoped>
.mask {
  min-height: 300px;
  max-height: 450px;
  overflow: hidden;
  background: var(--z-article-bg);
  border-radius: 0 0 10px 10px;

  .title-cover {
    opacity: .999;
    width: 65%;
    right: 0;
    margin: 0 -20% 0 auto;
    transform: rotate(10deg) translateY(-10%) scale(2);
    filter: blur(10px);
  }

  .title-info {
    color: white;
    padding: 0 57px;
    background: rgba(58, 71, 80, .1);
  }
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