<template>
  <div class="container">
    <!--  标题  -->
    <div class="text-2xl border-gray-300 mb-2 pb-2">
      评论
    </div>
    <!-- 评论输入框   -->
    <div class="input-wrapper">
      <el-input
        v-model="content"
        :rows="5"
        type="textarea"
        placeholder="请输入你的评论"
        @focus="cancel"
      />
      <div class="action-buttons">
        <el-popover
          v-model:visible="emojiShow"
          placement="bottom"
          :width="500"
          :height="300"
          trigger="click"
        >
          <template #reference>
            <el-button
              class="emoji-button"
            >
              <component :is="FaceSmileIcon" />
            </el-button>
          </template>
          <div class="browBox">
            <ul>
              <li
                v-for="(item, index) in faceList"
                :key="index"
                @click="getBrow(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-popover>
        <el-button
          class="submit-btn"
          type="primary"
          :disabled="content == ''"
          @click="submitMessage"
        >
          发送
        </el-button>
      </div>
    </div>
    <!-- 评论展示和评论回复列表   -->
    <div
      v-for="item in comments"
      :key="item.id"
      class="comment"
    >
      <div class="info">
        <img
          class="avatar"
          :src="item.fromAvatar||webInfoStore.getRandomAvatar()"
          width="36"
          height="36"
          alt="头像"
        >
        <div class="right">
          <div class="name">
            {{ item.fromName }}
          </div>
          <div class="date">
            {{ formatDateTime(item.createTime as any, 2) }}
          </div>
        </div>
      </div>
      <div class="content">
        {{ item.commentContent }}
      </div>
      <div class="control">
        <span
          class="like"
          :class="{ active: item.isLike }"
          @click="likeClick(item)"
        >
          <component :is="HandThumbUpIcon" />
          <span class="like-num">{{ item.likeCount > 0 ? item.likeCount + "人赞" : "赞" }}</span>
        </span>
        <span
          class="comment-reply"
          @click="showCommentInput(item)"
        >
          <component :is="ChatBubbleOvalLeftEllipsisIcon" />
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div
          v-for="reply in item.reply"
          :key="reply.id"
          class="item"
        >
          <div class="reply-content">
            <span class="from-name">{{ reply.fromName }}</span><span>: </span>
            <span class="to-name">@{{ reply.toName }}</span>
            <span>{{ reply.commentContent }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.createTime }}</span>
            <span
              class="reply-text"
              @click="showCommentInput(item, reply)"
            >
              <i class="iconfont icon-comment" />
              <span>回复</span>
            </span>
          </div>
        </div>
        <div
          v-if="item.reply?.length > 0"
          class="write-reply"
          @click="showCommentInput(item)"
        >
          <i class="el-icon-edit" />
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div
            v-if="showItemId === item.id"
            class="input-wrapper"
          >
            <div>
              <el-input
                v-model="inputComment"
                class="gray-bg-input"
                type="textarea"
                :rows="4"
                autofocus
                placeholder="写下你的评论"
              />
              <div style="bottom: 60px; right: 20px; position: absolute;">
                <el-popover
                  :key="'reply'"
                  placement="bottom"
                  :width="500"
                  :height="300"
                  trigger="click"
                >
                  <template #reference>
                    <el-button
                      class="emoji-button"
                    >
                      <component :is="FaceSmileIcon" />
                    </el-button>
                  </template>
                  <div class="browBox">
                    <ul>
                      <li
                        v-for="(item, index) in faceList"
                        :key="index"
                        @click="getBrowInputComment(index)"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </el-popover>
              </div>
            </div>
            <div class="btn-control">
              <span
                class="cancel"
                @click="cancel"
              >取消</span>
              <el-button
                class="btn"
                type="success"
                round
                @click="commitComment"
              >
                确定
              </el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {formatDateTime} from "@/static/modules/utils";
import {useWebInfoStore} from "@/store/webInfoStore";
import appData from "@/assets/images/emojis.json";
import {ChatBubbleOvalLeftEllipsisIcon, FaceSmileIcon} from "@heroicons/vue/24/solid";
import {HandThumbUpIcon} from "@heroicons/vue/16/solid";
import { likeCountComment} from "@/api/comment";

const webInfoStore = useWebInfoStore();

const props = defineProps<{
  comments: Array<{
    id: string; // 评论id
    fromAvatar: string; // 头像
    fromName: string; // 评论人昵称
    createTime: string; //   评论时间
    commentContent: string; // 评论内容
    isLike: boolean | null; // 是否点赞
    likeCount: number; // 点赞数
    reply: Array<{
      id: string; // 回复id
      fromName: string; // 回复人昵称
      toName: string; // 被回复人昵称
      commentContent: string; // 回复内容
      createTime: string; // 回复时间
    }>;
  }>,
  // 文章ID
  articleId: number,
}>();
const inputComment = ref("");
const showItemId = ref<string | null>(null);
// 表情列表
const faceList = ref([]);
const loadEmojis = () => {
  for (const i in appData) {
    faceList.value.push((appData[i].char) as never);
  }
};
loadEmojis();
const emojiShow = ref(false);
const content = ref("");
const submitMessage = () => {
  console.log(content.value);
  content.value = "";
};
const getBrow = (index: number) => {
  content.value += faceList.value[index];
  emojiShow.value = false;
};
const getBrowInputComment = (index: number) => {
  inputComment.value += faceList.value[index];
  emojiShow.value = false;
};
watch(() => props.comments, (newComments) => {
  console.log(newComments);
});
// 点赞
const likeClick = async (item: any) => {
  if (item.isLike === null) {
    item.isLike = true;
    item.likeCount++;
  } else {
    item.isLike ? item.likeCount-- : item.likeCount++;
    item.isLike = !item.isLike;
  }
  await likeCountComment(item.id, item.isLike);
};
// 取消回复
const cancel = () => {
  showItemId.value = null;
};
// 提交评论
const commitComment = () => {
  console.log(inputComment.value); // 评论内容
  console.log(showItemId.value); // 评论父ID
  console.log(props.articleId); // 文章ID
};
// 显示评论输入框
const showCommentInput = (item: any, reply?: any) => {
  inputComment.value = reply ? "@" + reply.fromName + " " : "";
  showItemId.value = item.id;
};
</script>

<style scoped lang="scss">
$color-main: #409EFF;
$color-success: #67C23A;
$color-warning: #E6A23C;
$color-danger: #F56C6C;
$color-info: #909399;

$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399; //次要文字
$text-placeholder: #C0C4CC;
$text-333: #333;

$border-first: #DCDFE6;
$border-second: #E4E7ED;
$border-third: #EBEEF5;
$border-fourth: #F2F6FC;

$content-bg-color: #fff;


.container {
  padding: 0 10px;
  box-sizing: border-box;

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: 50%;
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }

    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }

    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;

      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;

        &.active,
        &:hover {
          color: $color-main;
        }

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $text-333;
        }

        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }

    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;

      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;

        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;

          .from-name {
            color: $color-main;
          }

          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }

        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;

          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }

            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }

      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;

        &:hover {
          color: $text-main;
        }

        .el-icon-edit {
          margin-right: 5px;
        }
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }

      .input-wrapper {
        padding: 10px;

        .gray-bg-input,
        .el-input__inner {
          /* background-color: #67C23A; */
        }

        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;

          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }
          }

          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}

/* 输入框 */
.browBox {
  width: 100%;
  height: 300px;
  background: #e6e6e6;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 100;
  overflow: scroll;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    li {
      cursor: pointer;
      width: 10%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}

.submit-btn {
  margin: 8px 15px 0 0;
  float: right;
}

.input-wrapper {
  position: relative; /* 使得内部元素可以相对定位 */
}

.action-buttons {
  position: absolute; /* 将按钮绝对定位 */
  bottom: 10px; /* 相对于 input 控件底部的距离 */
  right: 10px; /* 右侧多少距离 */
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

.emoji-button {
  margin: 8px 15px 0 0;
}
</style>
