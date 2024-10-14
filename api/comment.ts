import {useDefaultRequest} from "@/utils/request";
import type {CommentItem, TopCommentItem, Comment} from "@/types/commentInterface";
export enum Type {
  Comment     = 0, // 评论
  Leave    = 1, // 2:树洞留言
  Love      = 2 // 3：家庭情感
}
export interface CommentInterface {
  source: number; // 文章id
  content: string; // 评论内容
  userId: number; // 用户id
  parentUserId: number; // 父评论用户id
  type: Type; // 评论类型
  parentCommentId: number; // 父评论id
  commentContent: string; // 回复内容
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

export function saveComment(comment: {
  parentUserId: null | number;
  parentCommentId: any;
  commentContent: string;
  source: number
  type: number;
}) {
  comment.type  = Type.Comment;
  return useDefaultRequest.post(BASE_URL+"/create", comment);
}



