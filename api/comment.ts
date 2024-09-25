import {useDefaultRequest} from "@/utils/request";
import type {CommentItem, TopCommentItem, Comment} from "@/types/commentInterface";
enum Type {
  Comment     = 0, // 评论
  Leave    = 1, // 2:树洞留言
  Love      = 2 // 3：家庭情感
}

/**
 * 获取评论列表
 */
const BASE_URL = "/comment";

/**
 * 获取评论列表
 * @param articleId 文章id
 * @param pagination
 */
export function listTypeComment(articleId: number, pagination: number) {
  const params = {
    source: articleId,
    Type: Type.Comment,
    pageNo: pagination
  };
  return useDefaultRequest.get<any>(BASE_URL + "/list", params);
}

export function likeCountComment(id: number,flog: boolean) {
  const params = {
    id: id,
    flogLike: flog
  };
  return useDefaultRequest.get<any>(BASE_URL + "/likeAdd", params);
}

export function topComment(){
  return useDefaultRequest.get<TopCommentItem[]>(BASE_URL + "/top");
}

export function saveComment(comment: Comment) {
  return useDefaultRequest.post(BASE_URL, comment);
}



