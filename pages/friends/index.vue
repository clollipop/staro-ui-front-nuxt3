<script lang="ts" setup>
import {useGlobalStore} from "@/store/globalStore";
import {FriendItem} from "#components";
import type {Friend} from "@/types/friendInterface";
import {listFriend} from "@/api/friend";
// 获取Nuxt应用实例中的$viewport对象
const {$viewport} = useNuxtApp();
const globalStore = useGlobalStore();
const friendList = ref<Friend[]>([]);

/**
 * 数据获取
 */
nextTick(async () => {
  await getFriendList();
});

function showFriendForm() {
  globalStore.setShowFriendForm(true);
}

async function getFriendList() {
  friendList.value = await listFriend();
}
const isMobile = ref($viewport.isLessThan("tablet"));

useSeoMeta({
  title: "友链",
  description: "友链页"
});
</script>

<template>
  <div>
    <Friend />
    <div
      id="main"
      class="page flex"
    >
      <div class="friend-content relative w-full p-5 rounded-lg">
        <div class="box-header flex justify-end">
          <div class="right cursor-pointer">
            <span
              class="stress mx-2"
              @click="showFriendForm"
            >
              交换友链
            </span>
            <i class="fa fa-send" />
          </div>
        </div>
        <div class="friend-list grid gap-5">
          <FriendItem
            v-for="(item, index) in friendList"
            :key="index"
            :friend="item"
          />
        </div>
      </div>
      <div
        v-if="!isMobile"
        style="margin-left: 15px;"
      >
        <ProfileCard />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.friend {
  &-content {
    border: 1px solid #ffffff;
    background: rgba(var(--z-common-bg), .6);
  }

  &-list {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    margin: 55px 35px;
  }
}
</style>
