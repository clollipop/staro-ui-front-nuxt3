import {useDefaultRequest} from "@/utils/request";

/**
 * 邮箱验证码登录
 */
export interface LoginMailCode {
  mail: string;
  password: string;
  code: string;
}

/**
 * 邮箱密码登录
 */
export interface LoginMail {
  mail: string;
  password: string;
}


const BASE_URL = "/member/user";
// 获得基本信息
export const getUserInfo = ()=> {
  return useDefaultRequest.get(BASE_URL + "/get");
};
