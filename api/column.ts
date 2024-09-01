import {useDefaultRequest} from "@/utils/request";

const BASE_URL = "/blog/v1/columns";

export async function getColumnInfo(columnId: string): Promise<any> {
  return useDefaultRequest.get<any>(BASE_URL + `/info/${columnId}`);
}

export async function listColumnByCategoryId(categoryId: string, pagination: number): Promise<any> {
  const params = {
    p: pagination
  };
  return useDefaultRequest.get<[]>(BASE_URL + `/list/${categoryId}`, params);
}

export async function listColumnByArticleId(articleId: string): Promise<any> {
  return useDefaultRequest.get<[]>(BASE_URL + `/article/list/${articleId}`);
}

