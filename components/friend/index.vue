<script setup lang="ts">
import {OuOButton, OuOInput, OuOMessage, OuOTag, OuOTextarea} from "@/static/modules/ouo";
import {useGlobalStore} from "@/store/globalStore";
import type {Friend} from "@/types/friendInterface";
import {saveFriend, updateFriend} from "@/api/friend";
import {AuthorImpl} from "@/types/impl/author";

const globalStore = useGlobalStore();
const authorInfo = new AuthorImpl();
const friend = reactive<Friend>({} as Friend);
const websiteTitle = ref("友链网址");
const flogUpdateFriend = ref(false);

async function onSend() {
  const isSend = sessionStorage.getItem("friend");
  if (isSend) {
    OuOMessage.warning("您已提交过友链，请勿重复提交");
    return;
  }
  if (!friend.name || !friend.website || !friend.avatar) {
    OuOMessage.warning("友链名称、网址、头像不能为空");
    return;
  }
  if (flogUpdateFriend.value && !friend.oldWebsite) {
    OuOMessage.warning("请填写原来的友链地址");
    return;
  }
  if (!(friend.website.startsWith("http://") || friend.website.startsWith("https://"))) {
    OuOMessage.warning("友链地址需以http或https开头");
    return;
  }
  if (!(friend.avatar.startsWith("http://") || friend.avatar.startsWith("https://"))) {
    OuOMessage.warning("头像地址需以http或https开头");
    return;
  }
  let data;
  if (flogUpdateFriend.value) {
    data = await updateFriend(friend);
  } else {
    data = await saveFriend(friend);
  }

  if (data.state === "success") {
    OuOMessage.success("友链信息已提交");
    globalStore.showFriendForm = false;
    sessionStorage.setItem("friend", "true");
  }
}

function onCancel() {
  globalStore.showFriendForm = false;
}
</script>

<template>
  <div
    v-show="globalStore.showFriendForm"
    class="friend flex flex-row items-center justify-center absolute top-0 left-0  w-full"
  >
    <div class="friend__owner-info mx-11">
      <div class="friend__owner-info-title">
        博主信息
      </div>
      <div class="timeline">
        <span class="friend__owner-title">名称：</span>{{ authorInfo.name }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">网址：</span>{{ authorInfo.website }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">头像：</span>{{ authorInfo.website + authorInfo.avatar }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">邮箱：</span>{{ authorInfo.email }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">简介：</span>{{ authorInfo.description[1] }}
      </div>
    </div>
    <div class="m-7">
      <div class="friend-tips my-5">
        <p class="title mb-2">
          友链交换说明：
        </p>
        <p>不做任何广告，友链交换仅供交换友链，不得用于任何商业用途。</p>
      </div>
      <div class="my-3">
        <OuOTag
          class="mr-3"
          :size="'small'"
          :checked="'true'"
          @click="flogUpdateFriend=false"
        >
          新增
        </OuOTag>
        <OuOTag
          :size="'small'"
          @click="flogUpdateFriend=true"
        >
          更新
        </OuOTag>
      </div>
      <div class="my-3">
        <div class="my-3">
          博客类型：
        </div>
        <OuOTag
          class="mr-3"
          :size="'small'"
          :checked="'true'"
          :group="'type'"
          @click="friend.type='0'"
        >
          默认
        </OuOTag>
        <OuOTag
          class="mr-3"
          :size="'small'"
          :group="'type'"
          @click="friend.type='1'"
        >
          技术
        </OuOTag>
        <OuOTag
          class="mr-3"
          :size="'small'"
          :group="'type'"
          @click="friend.type='2'"
        >
          学习
        </OuOTag>
        <OuOTag
          class="mr-3"
          :size="'small'"
          :group="'type'"
          @click="friend.type='3'"
        >
          艺术
        </OuOTag>
      </div>

      <div class="friend__form flex flex-col overflow-y-scroll">
        <div class="m-1 friend__form-input">
          <OuOInput
            v-model="friend.name"
            :placeholder="'名称'"
            :border="true"
          />
        </div>
        <div
          v-show="flogUpdateFriend"
          class="m-1 friend__form-input"
        >
          <OuOInput
            v-model="friend.oldWebsite"
            :placeholder="'原来的友链网址'"
            :border="true"
          />
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput
            v-model="friend.website"
            :placeholder="websiteTitle"
            :border="true"
          />
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput
            v-model="friend.avatar"
            :placeholder="'头像地址'"
            :border="true"
          />
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput
            v-model="friend.email"
            :placeholder="'邮箱'"
            :border="true"
          />
        </div>
        <div class="m-1 friend__form-textarea">
          <OuOTextarea
            v-model="friend.description"
            :placeholder="'简介'"
            :border="true"
            :rows="3"
          />
        </div>
        <div class="friend__footer">
          <div class="friend__footer-send flex justify-end my-4 mr-1">
            <OuOButton
              :size="'middle'"
              :color="'danger'"
              :type="'transparent'"
              class="mr-2"
              @click="onCancel"
            >
              取消
            </OuOButton>
            <OuOButton
              :size="'middle'"
              @click="onSend"
            >
              提交
            </OuOButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  margin: 11px 0;
}

.friend {
  z-index: 11;
  background-color: rgba(var(--z-common-bg), .2);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
  padding: 50px;
  min-height: 100vh;

  &__form {
    &-input {
      height: 39px;
    }
  }
}

.friend__owner {
  &-title {
    font-size: 16px;
    font-weight: 500;
  }

  &-info {
    &-title {
      margin-left: -13px;
      margin-bottom: 18px;
      font-size: 22px;
      font-weight: 600;
    }
  }
}
@media (max-width: 768px) {
  .friend {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 80vh;
  }

}
</style>
