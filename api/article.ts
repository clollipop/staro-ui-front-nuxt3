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
/**
 * 获取文章列表 分页
 * @param pagination
 */
export const listArticle = (pagination: number) => {
  const params = {
    pageNo: pagination,
    pageSize: 12
  };
  return useDefaultRequest.getRawData(BASE_URL + "/page", params);
};
/**
 * 获取文章详情
 * @param id
 */
export const getArticleDetail = (id: string) =>  {
  return useDefaultRequest.get(BASE_URL + "/get", {id});
};
/**
 * 根据标签ID获取文章列表 分页
 * @param labelId
 * @param pagination
 */
export const listArticleByLabelId = (labelId: number, pagination: number) => {
  const params = {
    pageNo: pagination,
    pageSize: 12
  };
  return useDefaultRequest.get(BASE_URL + `/page/label/${labelId}`, params);
};
/**
 * 根据ID 增加文章阅读数
 * @param id 文章ID
 */
export const addArticleViewCount = (id: number) => {
  return useDefaultRequest.get(BASE_URL + "/addViewCount", {id});
};
/**
 * 查询推荐文章列表 最多6条
 */
export const recommendArticleListSix = () => {
  return useDefaultRequest.get(BASE_URL + "/recommendArticleListSix", {});
};



