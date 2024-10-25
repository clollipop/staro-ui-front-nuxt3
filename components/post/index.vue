<script setup lang="ts">
import {useMenuStore} from "@/store/menuStore";
import {listArticle, recommendArticleListSix} from "@/api/article";
import ArticleItem from "@/components/list/ArticleItem.vue";
import {formatDateTime} from "@/static/modules/utils";
import {useWebInfoStore} from "@/store/webInfoStore";

const {$viewport} = useNuxtApp();
const menuState = useMenuStore();
const webInfoStore = useWebInfoStore();
const list = ref<any>([]);
const totalPage = ref(0);
const lastPagination = ref(0);

async function getArticleList(pagination: number) {
  const data = await listArticle(pagination);
  list.value = data.list;
  totalPage.value = Math.floor(Number.parseInt(data.total) / 10) + 1;
}

async function switchPage(pagination: any) {
  const newPagination = pagination;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > totalPage) {
    return;
  }
  lastPagination.value = newPagination;
  await getArticleList(newPagination);
}
// 触摸相关状态变量
let startX = 0;
let endX = 0;
// 处理PC端的滑动事件
let startY = 0;
let endY = 0;
const carouselRef = ref<any>(null);
// true 为手机端，false 为 PC 端
const isMobile = ref($viewport.isLessThan("tablet"));
// 处理PC端的滚轮滑动事件
const handleWheel = (event: WheelEvent) => {
  if ($viewport.isLessThan("tablet")) {
    return;
  }
  if (!carouselRef.value) return;
  // PC 端根据方向处理滚轮滑动
  const isHorizontal = $viewport.isLessThan("tablet");
  if (isHorizontal) {
    // 横向滑动时，用 deltaX 控制
    if (event.deltaX > 0) {
      carouselRef.value.next();
    } else if (event.deltaX < 0) {
      carouselRef.value.prev();
    }
  } else {
    // 纵向滑动时，用 deltaY 控制
    if (event.deltaY > 0) {
      carouselRef.value.next();
    } else if (event.deltaY < 0) {
      carouselRef.value.prev();
    }
  }
};
// 处理移动端触摸滑动事件
const handleTouchStart = (event: TouchEvent) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
};

const handleTouchMove = (event: TouchEvent) => {
  endX = event.touches[0].clientX;
  endY = event.touches[0].clientY;
};
const handleTouchEnd = () => {
  if (!carouselRef.value) return;
  if (startX - endX > 50) {
    // 向左滑动 -> 下一页
    carouselRef.value.next();
  } else if (endX - startX > 50) {
    // 向右滑动 -> 上一页
    carouselRef.value.prev();
  }
  
};
// 鼠标与触摸事件处理
const mousedown = (event: MouseEvent) => {
  startY = event.clientY;
};
const mouseup = (event: MouseEvent) => {
  endY = event.clientY;
  if (!carouselRef.value) return;
  if (startY - endY > 50) {
    // 向左滑动 -> 下一页
    carouselRef.value.next();
  } else if (endY - startY > 50) {
    // 向右滑动 -> 上一页
    carouselRef.value.prev();
  }
};
const recommendArticles = ref<any[]>([]);
const getRecommendArticles = async () => {
  const data = await recommendArticleListSix();
  recommendArticles.value = data;
};
onMounted(async () => {
  menuState.setWithoutComment();
  await nextTick(() => {
    getArticleList(1);
    getRecommendArticles();
  });
});
</script>

<template>
  <div
    id="post"
    class="flex"
  >
    <div class="article-list-container flex-grow">
      <div
        class="carousel-container select-none"
        @wheel="handleWheel"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <el-carousel
          ref="carouselRef"
          :height="`${isMobile ? '300px' : '200px'}`"
          :direction="`${isMobile ? 'horizontal' : 'vertical'}`"
          style="border-radius: 20px"
          :pause-on-hover="!isMobile"
        >
          <el-carousel-item
            v-for="item in recommendArticles"
            :key="item.id"
          >
            <div class="carousel-card">
              <img
                :src="item?.image || webInfoStore.getRandomAvatar()"
                alt="Image"
                class="carousel-image"
              >
              <div class="carousel-content">
                <p class="carousel-date">
                  {{ formatDateTime( item?.createTime, 1) }}
                </p>
                <h3 class="carousel-title">
                  {{ item?.title }}
                </h3>
                <p class="carousel-description">
                  {{ item?.digest || "暂无摘要" }}
                </p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="box-header flex justify-between" />
      <div class="grid auto-grid gap-9 gap-y-7 pc:gap-5 screen">
        <div
          v-for="article in list"
          :key="article.id"
        >
          <ArticleItem :article="article" />
        </div>
      </div>
      <div class="pagination flex justify-center w-full mt-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="12"
          :total="totalPage"
          @current-change="switchPage"
        />
      </div>
    </div>
    <div
      v-if="!isMobile"
      class="profile-card-container"
    >
      <ProfileCard />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/static/css/elementPlus.scss";
#post {
  display: flex;
  padding: 10px 5vw;
}

.profile-card-container {
  width: 250px;
}

.article-list-container {
  flex-grow: 1; // 允许文章列表占用剩余空间
}

// 原有文章列表样式
.pagination {
  color: rgb(var(--z-fontcolor-gray));
}

// 媒体查询：针对手机和小屏幕进行优化
@media (max-width: 768px) {
  #post {
    flex-direction: column;
    padding: 10px;
  }

  .profile-card-container {
    width: 100%;
    margin-right: 0;
  }

  .article-list-container {
    padding: 0 50px;
  }

  .grid.auto-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .carousel-container {
    height: 300px !important;
    background: rgba(var(--z-global-bg), 0.9) !important;
  }
  .carousel-card {
    flex-direction: column;
    align-items: center;
    height: 300px !important;
    color: #969797;

  }

  .carousel-image {
    width: 200px !important;
    height: 130px !important;
    border-radius: 15px;
    object-fit: cover;
  }
  .carousel-content {
    margin-left: 0!important;
  }
  // 轮播图日期字体大小
  .carousel-date {
    margin: 10px 0!important ;
    text-align: center;
  }
  // 轮播图标题字体大小
  .carousel-title {
    font-weight: bold;
    margin: 5px 0;
  }
  // 轮播图描述字体大小
  .carousel-description {
    text-align: center;
    color: rgb(var(--z-fontcolor-gray));
  }
  ::v-deep(.el-carousel .el-carousel--horizontal){
    height: 300px !important;
  }
}

::v-deep(.el-carousel__indicator--vertical .el-carousel__button){
  width: 10px!important;
  height: 10px!important;
  border-radius: 50%;
}
::v-deep(.el-carousel__indicator .el-carousel__button){
  width: 10px!important;
  height: 10px!important;
  border-radius: 50%;
}

.carousel-container {
  border-radius: 20px;
  border: 1px solid #ffffff;
  overflow: hidden;
  width: 96.8%;
  background: rgba(var(--z-global-bg), 0.6);
}

.carousel-card {
  display: flex;
  cursor: pointer;
  padding: 30px 20px;
}

.carousel-image {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
}

.carousel-content {
  margin-left: 50px;
}

.carousel-date {
  font-size: 16px;
}

.carousel-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.carousel-description {
  font-size: 16px;
}
</style>