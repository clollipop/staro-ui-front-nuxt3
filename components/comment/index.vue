<template>
  <div class="container">
    <div
      v-for="item in comments"
      :key="item.id"
      class="comment"
    >
      <div class="info">
        <img
          class="avatar"
          :src="item.fromAvatar"
          width="36"
          height="36"
          alt="头像"
        >
        <div class="right">
          <div class="name">
            {{ item.fromName }}
          </div>
          <div class="date">
            {{ item.createTime }}
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
          <i class="iconfont icon-like" />
          <span class="like-num">{{ item.likeCount > 0 ? item.likeCount + '人赞' : '赞' }}</span>
        </span>
        <span
          class="comment-reply"
          @click="showCommentInput(item)"
        >
          <i class="iconfont icon-comment" />
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
          v-if="item.reply.length > 0"
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
            <el-input
              v-model="inputComment"
              class="gray-bg-input"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            />
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
import { ref, defineProps, watch } from "vue";

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
  }>;
}>();

const inputComment = ref("");
const showItemId = ref<string | null>(null);

watch(() => props.comments, (newComments) => {
  console.log(newComments);
});

const likeClick = (item: any) => {
  if (item.isLike === null) {
    item.isLike = true;
    item.likeCount++;
  } else {
    item.isLike ? item.likeCount-- : item.likeCount++;
    item.isLike = !item.isLike;
  }
};

const cancel = () => {
  showItemId.value = null;
};

const commitComment = () => {
  console.log(inputComment.value);
};

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
$text-minor: #909399;  //次要文字
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
</style>
