<script setup lang="ts">
import Typed from "typed.js";
import {AuthorImpl} from "@/types/impl/author";

const authorInfo = new AuthorImpl();

// 获取需要应用打字效果的 DOM 元素
const typedElement = ref(null);
onMounted(() => {
  const options = {
    strings: authorInfo.description,
    loop: true,
    startDelay: 300,
    typeSpeed: 100,
    backSpeed: 50
  };
  // 初始化 Typed.js
  new Typed(typedElement.value, options);
});
</script>
<template>
  <div
    id="landing"
    class="ss-font mb-3 flex items-center justify-center relative"
  >
    <div class="landing-info absolute text-center">
      <div class="landing-info-landing">
        欢迎来到{{ authorInfo.siteName }}
      </div>
      <span
        ref="typedElement"
        class="landing-info-description typing neon-text"
      />
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

<style scoped lang="scss">
@media (max-width: 768px) {
  #landing {
    margin-top: 5vh !important;
    height: 15vh !important;
    min-height: 15vh !important;
  }

  .landing-info {
    &-landing {
      font-size: 2em !important;
      letter-spacing: 4px !important;
    }

    &-description {
      font-size: 1.5em !important;
      height: 40px !important;
      letter-spacing: 4px !important;
    }
  }

  .typing {
    font-size: 1.2em; // 降低打字效果字体大小
  }
}

#landing {
  height: 25vh;
  min-height: 15vh;
  width: inherit;
}

.landing-info {
  z-index: 1;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  animation: animate 5s linear infinite;

  &-landing {
    margin-top: 10px;
    font-size: 2.85em;
    letter-spacing: 7px;
  }

  &-description {
    font-size: 1.72em;
    height: 50px;
    letter-spacing: 6px;
  }
}

[data-theme="dark"] .landing-info {
  text-shadow: 0 0 3px rgb(var(--z-primary-color)), 0 0 7px rgb(var(--z-primary-color)), 0 0 12px rgb(var(--z-primary-color)), 0 0 20px rgb(var(--z-primary-color)), 0 0 60px rgb(var(--z-primary-color));
}

.typing {
  font-size: 1.5em;
  color: #ffff;
}

.neon-text {
  color: rgb(var(--z-fontcolor));
}

/*黑夜字体*/
[data-theme="dark"] .neon-text {
  font-weight: bold;
  color: var(--z-fontcolor); /* 默认文字颜色 */
  animation: breathe 4s ease-in-out infinite; /* 动画设置 */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), /* 柔和的白色阴影 */
  0 0 10px rgba(255, 0, 255, 0.5), /* 紫色光晕 */
  0 0 15px rgba(0, 255, 255, 0.3); /* 青色光晕 */
}

@keyframes breathe {
  0% {
    text-shadow: 0 0 10px rgba(255, 140, 0, 0.5), /* 温和的橙色阴影 */
    0 0 20px rgba(255, 0, 255, 0.3), /* 柔和的紫色 */
    0 0 30px rgba(0, 255, 255, 0.2); /* 柔和的青色 */
  }
  50% {
    text-shadow: 0 0 10px rgba(30, 144, 255, 0.5), /* 温和的蓝色阴影 */
    0 0 20px rgba(0, 255, 255, 0.4), /* 更明亮的青色 */
    0 0 30px rgba(0, 255, 255, 0.2);
  }
  100% {
    text-shadow: 0 0 10px rgba(0, 255, 127, 0.5), /* 温和绿色阴影 */
    0 0 20px rgba(0, 255, 255, 0.3), /* 柔和的青色 */
    0 0 30px rgba(255, 140, 0, 0.2); /* 柔和的橙色 */
  }
}
/* 波浪效果 白天*/
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
/* 波浪效果 黑夜*/
[data-theme="dark"] .waves-parallax {
  &:nth-child(1) {
    fill: rgba(167, 177, 190, 0.7); /* 第一层波浪 */
  }
  &:nth-child(2) {
    fill: rgba(167, 177, 190, 0.5); /* 第二层波浪 */
  }
  &:nth-child(3) {
    fill: rgba(167, 177, 190, 0.3); /* 第三层波浪 */
  }
  &:nth-child(4) {
    fill: rgb(167, 177, 190); /* 第四层波浪 */
  }
}

</style>
