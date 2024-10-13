<template>
  <div class="profile-card">
    <div class="card">
      <div class="card-header flex justify-center">
        <img
          class="avatar"
          :src="data.avatar"
          alt="avatar"
        >
        <div class="author-status-box">
          <div class="author-status">
            📙<span>认真学习中</span>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h2 class="name">
          {{ data.name }}
        </h2>
        <div class="stats">
          <div>
            <span>文章</span>
            <div>20</div>
          </div>
          <div>
            <span>标签</span>
            <div>20</div>
          </div>
          <div>
            <span>分类</span>
            <div>20</div>
          </div>
        </div>
        <button class="action-button flex">
          前往小家...
          <span
            class="moving-icon"
            style="display: flex;font-size: 20px;"
          >
            <Icon
              name="fxemoji:airplane"
            />
          </span>
        </button>
      </div>
      <div class="card-footer">
        <div class="icon-buttons">
          <a
            href="https://github.com/yourusername"
            class="icon-button"
            style="background-color:#f6f8fa;"
          >
            <Icon
              class="a-icon"
              name="fluent-emoji-flat:open-mailbox-with-raised-flag"
            />
          </a>
          <a
            href="mailto:your.email@example.com"
            class="icon-button"
            style="background-color:#f6f8fa;"
          >
            <Icon
              class="a-icon"
              name="logos:github-icon"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useWebInfoStore} from "@/store/webInfoStore";

const data = ref<any>({}); // 初始化数据的 ref

nextTick(async () => {
  const webInfoStore =  useWebInfoStore();
  // 直接从 store 获取数据
  data.value = webInfoStore.webInfo;
});
</script>

<style scoped lang="scss">
.profile-card {
  border: 1px solid rgb(255,255,255);
  position: relative; /* 使伪元素定位相对于这个元素 */
  min-width: 300px;
  min-height: 350px;
  border-radius: 15px;
  box-shadow: 0 0 5px #424444;;
  overflow: hidden;
  background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
  text-align: center; /* 使文本内容居中 */
  .card {
    background-image: url(https://cdn.staro.cc/blog/pic/bg/A71C01D24445270735F2DB5967EEBF19_11_11zontm.webp);
    background-repeat: no-repeat;
    background-position: center calc(0% - 130px); /* 上移 10px */
    background-attachment: inherit;
    background-size: cover;
    min-height: 350px;
  }
}
[data-theme="dark"] .card {
  background-image: none;
  background-color: #222222;
}
.profile-card::before {
  content: ""; /* 创建伪元素 */
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色遮罩 */
  border-radius: 15px; /* 保持与主容器相同的圆角 */
  z-index: 1; /* 确保遮罩显示在背景上方 */
}

.card-header,
.card-body,
.card-footer {
  position: relative; /* 使子元素相对于父元素定位 */
  z-index: 2; /* 确保内容显示在遮罩之上 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
}

.card-body {
  display: flex; /* 使用 flexbox 布局 */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中对齐 */
}

.name {
  margin-bottom: 10px; /* 给标题一些外边距 */
  font-size: 24px;
}

.stats {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  width: 100%; /* 确保统计项在整个宽度内部 */
  span {
    font-weight: 500;
    margin: 0 10px;
    font-size: 18px;
  }

  div {
    margin-top: 5px;
    font-size: 18px;
  }
}

.action-button {
  padding: 10px 90px;
  border-radius: 30px;
  background-color: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
}

.action-button:hover {
  background-color: #357ABD;
}

/*图标移动动画*/
.moving-icon {
  display: inline-flex; /* 保证图标宽度合适 */
  animation: moveRight 2.5s linear infinite; /* 添加动画 */
}

@keyframes moveRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50px); /* 调整移动距离 */
  }
}

.icon-buttons {
  display: flex;
  justify-content: center; /* 居中显示 */
  margin-top: 10px; /* 按需求调整间距 */
}

.icon-button {
  width: 30px; /* 按需调整大小 */
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px; /* 按需调整间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden; /* 确保图标不溢出 */
  transition: background-color 0.2s ease; /* 背景色过渡 */
}

.icon-button .a-icon {
  width: 80%; /* 根据图标比例调整 */
  height: 100%;
  border-radius: 50%;

}

.icon-button:hover {
  animation: scaleAndRotate 0.6s forwards; /* 悬停时执行缩放动画 */
  background-color: #f0f0f0; /* 悬停背景色 */
}

/* 定义缩放和旋转动画 */
@keyframes scaleAndRotate {
  0% {
    transform: scale(1) rotate(0deg); /* 初始状态 */
  }
  25% {
    transform: scale(1.1) rotate(-5deg); /* 向左旋转 */
  }
  50% {
    transform: scale(1.1) rotate(5deg); /* 向右旋转 */
  }
  75% {
    transform: scale(1.1) rotate(-2deg); /* 轻微向左旋转回 */
  }
  100% {
    transform: scale(1) rotate(0deg); /* 回复原状态 */
  }
}

/*头像旋转动画*/
.avatar {
  -webkit-transition: filter 375ms ease-in .2s, -webkit-transform .3s;
  -moz-transition: filter 375ms ease-in .2s, -moz-transform .3s;
  -o-transition: filter 375ms ease-in .2s, -o-transform .3s;
  -ms-transition: filter 375ms ease-in .2s, -ms-transform .3s;
  transition: filter 375ms ease-in .2s, transform .3s;
  object-fit: cover
}

.avatar:hover {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg)
}

/*头像光晕动画*/
.card-header img {
  animation: huxi_light 4s ease-in-out infinite
}

[data-theme="dark"] img {
  animation: huxi_dark 4s ease-in-out infinite;
}

@keyframes huxi_light {
  0% {
    box-shadow: 0 0 1px 1px #e9f5fa
  }

  50% {
    box-shadow: 0 0 5px 5px #e9f5fa
  }

  100% {
    box-shadow: 0 0 1px 1px #e9f5fa
  }
}

@keyframes huxi_dark {
  0% {
    box-shadow: 0 0 1px 1px #39c5bb
  }

  50% {
    box-shadow: 0 0 5px 5px #39c5bb
  }

  100% {
    box-shadow: 0 0 1px 1px #39c5bb
  }
}

/*卡片信息头像*/
.card-header .author-status-box {
  position: absolute;
  bottom: 0;
  left: calc(100% - 130px);
  width: 28px;
  height: 28px;
  border: 1px solid #d0d7de;
  color: #4c4948;
  border-radius: 2em;
  background-color: #f8f8f8f8;
  transition: .4s;
  overflow: hidden
}

[data-theme=dark] .card-header .author-status-box {
  background-color: #222222f2;
  border: 1px solid #5c6060
}

.card-header .author-status-box .author-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 5px
}

.card-header .author-status-box:hover {
  width: 105px
}

.card-header .author-status-box:hover .author-status span {
  width: 105px;
  margin-left: 4px
}

.card-header .author-status-box .author-status span {
  width: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: .4s
}
</style>
