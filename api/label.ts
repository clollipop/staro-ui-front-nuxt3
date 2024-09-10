import {useDefaultRequest} from "@/utils/request";

const BASE_URL = "label";

export async function getLabelInfo(columnId: string): Promise<any> {
  return useDefaultRequest.get<any>(BASE_URL + `/info/${columnId}`);
}

export async function listLabelBySortId(sortId: string, pagination: number): Promise<any> {
  const params = {
    id: sortId,
    p: pagination
  };
  return useDefaultRequest.get<[]>(BASE_URL + "/list/sort/id", params);
}

export async function listLabelByArticleId(articleId: string): Promise<any> {
  return useDefaultRequest.get<[]>(BASE_URL + `/article/list/${articleId}`);
}

