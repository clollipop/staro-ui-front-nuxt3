import {useDefaultRequest} from "@/utils/request";
import type {CommentItem, TopCommentItem, Comment} from "@/types/commentInterface";

/**
 * 获取评论列表
 */
const BASE_URL = "/comment/v1/comments";

export function listComment(path: string, pagination: number) {
  const params = {
    p: pagination
  };
  return useDefaultRequest.get<CommentItem[]>(BASE_URL + `/${path}`, params);
}

export function topComment(){
  return useDefaultRequest.get<TopCommentItem[]>(BASE_URL + "/top");
}

export function saveComment(comment: Comment) {
  return useDefaultRequest.post(BASE_URL, comment);
}



