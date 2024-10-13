import { hash } from "ohash";
import { OuOMessage } from "@/static/modules/ouo";
import type { UseFetchOptions } from "#app";
import type { KeysOf, PickFrom } from "#app/composables/asyncData";
import type {Ref} from "vue";
import {useTokenStore} from "@/store/tokenStore";
import { ElMessage } from "element-plus";
type MethodType = "GET" | "POST" | "PUT" | "DELETE";
type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

interface ResOptions<T> {
  data: T;
  code: number;
  success: boolean;
  detail?: string;
}

type HttpOption<T> = UseFetchOptions<ResOptions<T>, T, KeysOf<T>, any>;

// 基础配置
const BASE_URL = "/blog-api";

// 统一处理错误
const handleError = (message: string, error: any) => {
  console.error(message, error);
  ElMessage({
    showClose: true,
    message: message,
    type: "error"
  });
};

// 格式化结果工具函数
const formatResult = <T>(res: any, handleData: boolean): T | null => {
  if (!res) {
    ElMessage({
      showClose: true,
      message: "未获取到有效数据",
      type: "error"
    });
    return null;
  }
  const { data, code, msg } = res;
  if (code == 0) {
    return handleData ? toRaw(data) : toRaw(res);
  } else {
    ElMessage({
      showClose: true,
      message: msg || "操作失败",
      type: "error"
    });
    console.error("请求失败：", data);
    return null;
  }
};

// 核心请求方法
const request = async <T>(
  url: UrlType,
  method: MethodType,
  params?: Record<string, any>,
  body?: any,
  options?: HttpOption<T>
): Promise<T | null> => {
  try {
    // 生成唯一请求缓存Key
    const cacheKey = hash(url + method + JSON.stringify(params) + JSON.stringify(body));
    const token = useTokenStore();
    const { pending, data, error } = await useFetch(url, {
      baseURL: BASE_URL,
      key: cacheKey, // 防止重复请求
      method,
      credentials: "include",
      params,
      body: method === "POST" || method === "PUT" ? body : undefined,
      lazy: options?.lazy ?? true, // 默认为懒加载
      onRequest({ options }) {
        // 设置请求头
        options.headers = new Headers(options.headers);
        options.headers.set("Authorization",  "Bearer "+token.tokenData?.accessToken as any || {});
      },
      onRequestError({ error }) {
        handleError("请求出错", error);
      },
      onResponse({ response }) {
        return response._data;
      },
      onResponseError({ response }) {
        handleError("内容获取失败", response);
      },
      ...options // 合并自定义选项
    });

    // 使用 await 语法等待请求完成，而不是手动 while 等待
    await pending;

    // 检查是否有错误
    if (error.value) {
      handleError("请求错误", error.value);
      return null;
    }

    // 返回响应数据
    return data.value;
  } catch (error: any) {
    handleError("意外错误发生", error);
    return null;
  }
};

// 封装的请求方法
export const useDefaultRequest = {
  get: async <T=any>(url: string, params?: Record<string, any>, options?: HttpOption<T>): Promise<T | null> => {
    const res = await request<T>(url, "GET", params, undefined, options);
    return formatResult<T>(res, true);
  },
  post: async <T=any>(url: string, body: any, params?: Record<string, any>, options?: HttpOption<T>): Promise<T | null> => {
    const res = await request<T>(url, "POST", params, body, options);
    return formatResult<T>(res, true);
  },
  put: async <T=any>(url: string, body: any, params?: Record<string, any>, options?: HttpOption<T>): Promise<T | null> => {
    const res = await request<T>(url, "PUT", params, body, options);
    return formatResult<T>(res, true);
  },
  delete: async <T=any>(url: string, body?: any, params?: Record<string, any>, options?: HttpOption<T>): Promise<T | null> => {
    const res = await request<T>(url, "DELETE", params, body, options);
    return formatResult<T>(res, true);
  },
  getRawData: async <T=any>(url: string, params?: Record<string, any>, options?: HttpOption<T>): Promise<T | null> => {
    const res = await request<T>(url, "GET", params, undefined, options);
    return formatResult<T>(res, true);
  }
};
