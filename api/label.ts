import {useDefaultRequest} from "@/utils/request";

const BASE_URL = "label";

/**
 * 根据标签id 获取标签信息
 * @param labelId
 */
export async function getLabelInfo(labelId: number): Promise<any> {
  console.log(labelId);
  return useDefaultRequest.get<any>(BASE_URL + `/get/${labelId}`);
}

/**
 * 根据分类获取标签列表
 * @param sortId
 * @param pagination
 */
export async function listLabelBySortId(sortId: string, pagination: number): Promise<any> {
  const params = {
    id: sortId,
    p: pagination
  };
  return useDefaultRequest.get<[]>(BASE_URL + "/list/sort/id", params);
}

/**
 * 根据标签ID获取文章列表
 * @param articleId
 */
export async function listLabelByArticleId(articleId: string): Promise<any> {
  return useDefaultRequest.get<[]>(BASE_URL + `/article/list/${articleId}`);
}

