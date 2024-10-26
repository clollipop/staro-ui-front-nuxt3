<template>
  <div>
    <div id="userInfo" class="profile-container relative">
      <div class="avatar">
        <el-avatar
          :src="'https://q1.qlogo.cn/g?b=qq&nk=1792945133&s=640'"
          :size="100"
          class="absolute avatar-center"
        />
      </div>
      <div class="user-info">
        <h2 class="user-name">Star</h2>
        <p class="user-email">star@qq.com</p>
        <p class="user-bio">小菜鸡~~~</p>
        <div class="user-stats">
          <div class="stat">
            <strong>等级: </strong> 青铜
          </div>
          <div class="stat">
            <strong>获得点赞: </strong> 999+ 次
          </div>
          <div class="stat">
            <strong>内容获得评论: </strong> 999+ 次
          </div>
          <div class="stat">
            <strong>获得收藏: </strong> 999+ 次
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
#userInfo {
  background-color: rgba(var(--z-common-bg), 0.95);
  border-radius: 15px;
  min-height: 600px;
  border: 1px solid #fff3ec;
  width: 70%;
  position: relative;
  text-align: center;
  padding: 60px 20px 40px;
  margin: 0 auto;
}

.avatar-center {
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #fff3ec;
  border-radius: 50%;
}

.user-info {
  color: #333;
}

.user-name {
  font-size: 1.8em;
  color: var(--z-action-color);
  margin-bottom: 10px;
}

.user-email, .user-bio {
  margin: 5px 0;
  color: var(--z-action-color);
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 10px;
  border-radius: 10px;
}

.stat {
  font-size: 0.9em;
  color: var(--z-action-color);
}
</style>
