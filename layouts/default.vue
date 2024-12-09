<script setup lang="ts">
import "@/static/css/style.scss";
import "@/static/css/hover.scss";
import "@/static/css/elementPlus.scss";
import _ from "lodash";
import "@/static/modules/ouo/style.css";
import "font-awesome/css/font-awesome.css";
import {scrollSetToc, setAttribute} from "@/static/modules/utils";
import {useArticleStore} from "@/store/articleStore";
import {getWebInfo} from "@/api/webInfo";
import {useWebInfoStore} from "@/store/webInfoStore";
import {switchThemeType} from "@/utils/utils";
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
const now = new Date();
const hour = ref(now.getHours());
onMounted(() => {
  if (process.client) {
    if ($viewport.isLessThan("tablet")) {
      setAttribute("scroll", "scroll");
    } else {
      scrollHandler();
    }
    // 判断当前时间
    if (hour.value >= 6 && hour.value < 20) {
      switchThemeType("light");
    } else {
      switchThemeType("dark");
    }
  }
});
const drawer = ref(false);
provide("drawer", drawer);
// 加载网站信息
const env = useRuntimeConfig().public.env;
nextTick(async () => {
  const webInfo = await getWebInfo();
  webInfoStore.setWebInfoStore(webInfo);
  if (env === "production") {
    await import ("@/utils/banDebug");
  }
});
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <loading :show="(!webInfoStore.webInfo)&&(hour >= 7 && hour <= 20)" />
    <loadingDark :show="(!webInfoStore.webInfo)&&(hour < 7||hour > 20)" />
    <div
      id="basic"
      class="hm-font font-size-medium w-full flex flex-col relative"
    >
      <Drawer
        v-if="webInfoStore.webInfo"
        :model-value="drawer"
        @update:model-value="drawer = $event"
      />
      <div
        id="primary"
        class="w-full overflow-y-scroll"
      >
        <div class="w-full">
          <Header v-if="webInfoStore.webInfo" />
        </div>
        <NuxtPage v-if="webInfoStore.webInfo" />
        <div class="w-full">
          <Footer />
        </div>
      </div>
      <Menu />
    </div>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
  // 隐藏滚动条
  overflow: hidden;
}
#basic {
  height: 913px;
  color: rgb(var(--z-fontcolor));
  transition: all .3s;
}

#primary {
  //--z-bg: linear-gradient(to top right, rgba(var(--z-primary-color)), rgba(var(--z-primary-color), .8), rgba(var(--z-primary-color), .5) 150%);
  //background-color: rgba(var(--z-global-bg), .7);
}
</style>
