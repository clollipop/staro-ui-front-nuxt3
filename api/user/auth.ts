import {useDefaultRequest} from "@/utils/request";
import {useTokenStore} from "@/store/tokenStore";

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

/**
 * 邮件场景枚举
 */
export enum MailSceneEnum {
  MEMBER_REGISTER_LOGIN = 1, // "user-mail-login", "会员用户 - 邮箱注册并登陆"
  MEMBER_UPDATE_MOBILE = 2 , // "user-update-mobile", "会员用户 - 修改邮箱"
  MEMBER_UPDATE_PASSWORD = 3, // "user-update-password", "会员用户 - 修改密码"
  MEMBER_RESET_PASSWORD = 4, // "user-reset-password", "会员用户 - 忘记密码"
}

const BASE_URL = "/member/email/auth";
// 邮箱密码登录 有登录 没有注册
export const loginMailPassword = (body: LoginMail)=> {
  return useDefaultRequest.post(BASE_URL + "/login",body);
};
// 邮箱验证码注册登录 并登录 没有注册
export const loginMailCode = (body: LoginMailCode)=> {
  return useDefaultRequest.post(BASE_URL + "/email-login",body);
};
// 发送验证码
export const sendCode = (body: {mail: string, scene: MailSceneEnum})=> {
  return useDefaultRequest.post(BASE_URL + "/send-email-code",body);
};

// 刷新令牌
export const refreshToken = ()=> {
  const refreshTokenLet = useTokenStore();
  return useDefaultRequest.post(`${BASE_URL}/refresh-token?refreshToken=${refreshTokenLet.tokenData.refreshToken}`,{});
};
