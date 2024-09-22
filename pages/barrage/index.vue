<script setup lang="ts">
// 导入生成UUID的工具函数和API
import {generateNumericUUID} from "@/utils/utils";
import {createTreeHole, treeHoleList} from "@/api/treeHole";

// 响应式变量声明
const barrageList = ref<any>([]); // 存储获取的弹幕列表
const danmus = ref<any>([]); // 当前显示的弹幕
const currentDanmuIndex = ref(0); // 当前弹幕索引
const danmuContainer = ref<any>(null); // 弹幕容器的ref
const num = ref(0); // 用于控制弹幕的索引
const player = ref<any>(null); // 定时器的引用
const usInp = ref<string>(""); // 用户输入的弹幕文本

// 添加弹幕到显示列表
const addDanmu = (item: any) => {
  danmus.value.push(item);
  // 设置定时器以在动画完成后移除弹幕
  setTimeout(() => {
    const index = danmus.value.findIndex((d: any) => d.id === item.id);
    if (index !== -1) {
      danmus.value.splice(index, 1); // 从显示列表中移除该弹幕
    }
  }, 16000); // 设定弹幕持续时间
};

// 计算弹幕在容器中的垂直位置
const calculateTop = () => {
  const minTop = 100; // 最小顶部边距
  const lineCount = 15; // 允许的弹幕行数
  const availableHeight = danmuContainer.value.offsetHeight - minTop || 0; // 可用高度
  const lineHeight = availableHeight / lineCount; // 每行高度
  const lineIndex = currentDanmuIndex.value++ % lineCount; // 当前行索引
  return lineIndex * lineHeight + minTop; // 返回计算的顶部位置
};

// 弹幕获取函数
const barrageHand = async () => {
  num.value = 0; // 重新开始索引
  const data = await treeHoleList(); // 请求弹幕数据
  barrageList.value = data; // 将数据保存到列表中
  if (barrageList.value.length === 0) return; // 数据为空则退出

  // 设置定时器以周期性显示弹幕
  player.value = setInterval(() => {
    // 如果当前弹幕索引超过列表长度，则重新开始
    if (num.value >= barrageList.value.length) {
      num.value = 0; // 如果达到列表末尾，重置索引
    }

    // 添加弹幕
    addDanmu({
      id: generateNumericUUID(), // 生成唯一ID
      text: barrageList.value[num.value].message, // 获取弹幕内容
      top: calculateTop(), // 计算弹幕位置
      left: "100vw", // 初始位置设在右侧
      duration: Math.random() * (30 - 27) + 27, // 随机设置弹幕移动持续时间
      color: barrageList.value[num.value]["act"] ? "#f50" : "#fff" // 根据状态设置颜色
    });
    num.value++; // 移动到下一个弹幕
  }, 900); // 每1000毫秒生成一次弹幕
};

// 组件准备就绪后执行弹幕函数
nextTick(() => {
  barrageHand();
});

// 组件卸载时清楚定时器
onUnmounted(() => {
  clearInterval(player.value);
});

// 发送弹幕函数
const addBarrageHand = async () => {
  if (usInp.value.trim() === "") return; // 验证输入不为空
  const data = await createTreeHole({
    message: usInp.value.trim() // 清除空格后发送弹幕
  });
  // 如果成功，添加到当前显示
  if (data) {
    addDanmu({
      id: generateNumericUUID(), // 生成唯一ID
      text: usInp.value.trim(), // 获取用户输入
      top: calculateTop(), // 计算顶部位置
      left: "100vw", // 初始位置设在右侧
      duration: Math.random() * (30 - 28) + 28, // 随机设置移动持续时间
      color: "#f50" // 设置颜色
    });
  }
  usInp.value = ""; // 清空输入框
};
useSeoMeta({
  title: "留言板",
  description: "留言页"
});
</script>

<template>
  <div>
    <div class="w-full">
      <Header />
    </div>
    <!-- 背景图片 -->
    <div class="bg-img" />
    <div class="barrage">
      <!-- 顶层发送弹幕 -->
      <div class="bar-input">
        <label>
          <span style="color: #ffffff;font-size: 16px;font-weight: bold;text-align: center">
            留言弹幕板
          </span>
          <input
            v-model="usInp"
            type="text"
            placeholder="输入弹幕内容"
          >
          <button
            type="button"
            @click="addBarrageHand"
          >发射
          </button>
        </label>
      </div>
      <!-- 显示弹幕 -->
      <div
        id="danmu-container"
        ref="danmuContainer"
        class="danmu-container"
      >
        <div
          v-for="danmu in danmus"
          :key="danmu.id"
          class="danmu"
          :style="{
            top: danmu.top + 'px',
            left: danmu.left,
            animationDuration: danmu.duration + 's',
            color: danmu.color,
          }"
        >
          <div class="text">
            {{ danmu.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.barrage {
  width: 100%;
  min-height: calc(100vh);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .bar-input {
    label {
      display: inline-flex;
      flex-direction: column;
      gap: 10px;

      input {
        display: inline-flex;
        padding: 5px 10px;
        border: 1px solid #fff3ec;
        outline: none;
        background: transparent;
        font-size: 14px;
        color: #fff3ec;
        border-radius: 10px;
        &::placeholder {
          color: #fff3ec;
        }
      }

      button {
        padding: 5px 0;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff3ec;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }

  .danmu-container {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    .danmu {
      position: absolute;
      white-space: nowrap;
      color: white;
      padding: 5px;
      user-select: none;
      opacity: 0.8;
      animation-name: slide;
      animation-timing-function: linear;
      animation: slide 10s ease-in forwards;
    }

    @keyframes slide {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-1000vh);
      }
    }
  }
}

.bg-img {
  background-size: cover;
  position: fixed;
  z-index: -10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.text {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 5px 10px;
}
</style>
