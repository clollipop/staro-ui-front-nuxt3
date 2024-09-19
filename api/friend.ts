import {useDefaultRequest} from "@/utils/request";
import type {Result} from "@/types/resultInterface";

export interface Friend {
  website: string;
  oldWebsite: string;
  name: string;
  description: string;
  email: string;
  avatar: string;
  type: string;
}
/**
 * @description: 友链
  */
const BASE_URL = "/friends";

/**
 * @description: 保存
 * @param friend
 */
export function saveFriend(friend: Friend): Promise<any> {
  return useDefaultRequest.post<any>(BASE_URL+"/save", friend);
}
/**
 * @description: 更新
 * @param friend
 */
export function updateFriend(friend: Friend): Promise<any> {
  return useDefaultRequest.post<any>(BASE_URL+"/save", friend);
}

export function listFriend(): Promise<any> {
  return useDefaultRequest.get<any>(BASE_URL+"/list");
}
