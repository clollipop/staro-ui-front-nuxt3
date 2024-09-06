<script setup lang="ts">
/* import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js"; */
import "@/static/css/style.scss";
import "@/static/css/hover.scss";
import _ from "lodash";
import "@/static/modules/ouo/style.css";
import "font-awesome/css/font-awesome.css";
import {scrollSetToc, setAttribute} from "@/static/modules/utils";
import {useArticleStore} from "@/store/articleStore";
import {getWebInfo} from "@/api/webInfo";
import {useWebInfoStore} from "@/store/webInfoStore";

const {$viewport} = useNuxtApp();
const articleStore = useArticleStore();
const webInfoStore = useWebInfoStore();

const latestIndex = ref([0]);

// 滚动时定位Toc位置
function scrollHandlerSetToc(scrollTop: number) {
  const scrollToc = scrollSetToc(scrollTop, latestIndex.value, articleStore.tocList as any) as any;
  if (!scrollToc) {
    return;
  }
  latestIndex.value = scrollToc.latestIndex;
  // 防止重复设置当前选中目录
  if (articleStore.onClick) {
    return;
  }
  articleStore.setSelectTitle(scrollToc.id);
}

function scrollHandler() {
  try {
    const primary = document.getElementById("primary");
    primary!.onscroll = _.throttle(() => {
      const article = document.getElementById("article");
      const column = document.getElementById("column-info");

      // 滚动条向下
      if (primary!.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        if (article) {
          scrollHandlerSetToc(primary!.scrollTop);
        }
        setAttribute("scroll", "scroll");
      } else {
        // 滚动到顶部
        if (article || column) {
          setAttribute("scroll", "primary");
        } else {
          setAttribute("scroll", "top");
        }
      }
    }, 200);
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  if (process.client) {
    if ($viewport.isLessThan("tablet")) {
      setAttribute("scroll", "scroll");
    } else {
      scrollHandler();
    }
    // 加载网站信息
    nextTick(async () => {
      const webInfo = await getWebInfo();
      webInfoStore.setWebInfoStore(webInfo);
    });
  }
});
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <div
      id="basic"
      class="hm-font font-size-medium w-full h-screen flex flex-col relative"
    >
      <div
        id="primary"
        class="w-full overflow-y-scroll"
      >
        <NuxtPage />
        <Footer />
      </div>
      <Menu />
    </div>
  </div>
</template>

<style lang="scss">
#basic {
  color: rgb(var(--z-fontcolor));
  transition: all .3s;
}

#primary {
  --z-bg: linear-gradient(to top right, rgba(var(--z-primary-color)), rgba(var(--z-primary-color), .8), rgba(var(--z-primary-color), .5) 150%);
  background-color: rgba(var(--z-global-bg), .7);
}
</style>
