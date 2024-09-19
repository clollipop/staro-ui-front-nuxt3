import {useDefaultRequest} from "@/utils/request";

const BASE_URL = "/tree-hole";

/**
 * 创建树洞
 * @param params 树洞信息
 */
export function createTreeHole(params: any): Promise<any>  {
  return useDefaultRequest.post<any>(BASE_URL + "/create",params);
}
/**
 * 根据标签id 获取标签信息
 */
export async function treeHoleList(): Promise<any> {
  return useDefaultRequest.get<any>(BASE_URL + "/list");
}