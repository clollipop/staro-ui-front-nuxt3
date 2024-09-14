import {useDefaultRequest} from "@/utils/request";
import type {Article} from "@/types/articleInterface";

export interface ArticleVO {
  id: number;
  userId: number;
  sortId: number;
  labelId: number;
  cover: string;
  title: string;
  content: string;
  videoUrl: string;
  viewCount: number;
  likeCount: number;
  viewStatus: boolean;
  password: string;
  tips: string;
  recommendStatus: boolean;
  commentStatus: boolean;
}


const BASE_URL = "/article";
export const listArticle = (pagination: number) => {
  const params = {
    p: pagination
  };
  return useDefaultRequest.getRawData(BASE_URL + "/page", params);
};

export const getArticleDetail = (id: string) =>  {
  return useDefaultRequest.get(BASE_URL + "/get", {id});
};

export const listArticleByLabelId = (labelId: number, pagination: number) => {
  const params = {
    p: pagination
  };
  return useDefaultRequest.get(BASE_URL + `/list/label/${labelId}`, params);
}

