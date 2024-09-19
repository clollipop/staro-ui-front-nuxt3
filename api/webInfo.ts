import {useDefaultRequest} from "@/utils/request";
import type {Article, PreviewArticle} from "@/types/articleInterface";

export interface WebInfoVo {
  id: number
  userId: number
  sortId: number
  labelId: number
  cover: string
  title: string
  content: string
  videoUrl: string
  viewCount: number
  likeCount: number
  viewStatus: boolean
  password: string
  tips: string
  recommendStatus: boolean
  commentStatus: boolean
}


const BASE_URL = "/web-info";
export const getWebInfo = ()=> {
  return useDefaultRequest.get(BASE_URL + "/get");
};

