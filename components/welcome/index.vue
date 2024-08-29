<script setup lang="ts">
import {OuOStar} from "@/static/modules/ouo";
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
        class="landing-info-description typing"
      />
    </div>
    <OuOStar />
  </div>
</template>

<style scoped lang="scss">
#landing {
  height: 25vh;
  min-height: 25vh;
  width: inherit;
}

.landing-info {
  z-index: 1;
  opacity: .7;
  font-weight: 700;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  animation: animate 5s linear infinite;

  &-landing {
    margin: 30px;
    font-size: 19px;
    letter-spacing: 7px;
  }

  &-description {
    font-size: 27px;
    height: 50px;
    letter-spacing: 6px;
  }
}

[data-theme="dark"] .landing-info {
  text-shadow: 0 0 3px rgb(var(--z-primary-color)), 0 0 7px rgb(var(--z-primary-color)), 0 0 12px rgb(var(--z-primary-color)), 0 0 20px rgb(var(--z-primary-color)), 0 0 60px rgb(var(--z-primary-color));
}

.typing {
  font-size: 1.5em;
  color: #333;
}
</style>
