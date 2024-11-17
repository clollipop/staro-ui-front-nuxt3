import {useDefaultRequest} from "@/utils/request";
const BASE_URL = "/article/page";
export enum SearchType {
  All     = 0, // 搜索全部 标题和内容
  Title    = 1, // 1:搜索标题
  Content  = 2, // 2:搜索内容
  LabelId      = 3, // 3：搜索标签
  SortId      = 4 // 4：搜索分类
}
export interface SearchDTO {
  title: string;
  content: string;
  contentHtml: string;
  labelId?: number;
  sortId?: number;
  pageNo: number;
  type: number;
}

export async function searchAll(searchData: SearchDTO) {
  const params = {
    pageNo: searchData.pageNo,
    pageSize: 12,
    title: "",
    content: "",
    contentHtml: "",
    labelId: searchData.labelId!== undefined? searchData.labelId : undefined,
    sortId: searchData.sortId!== undefined? searchData.sortId : undefined,
    type: searchData.type
  };
  // 搜索全部
  if (searchData.type==SearchType.All) {
    params.title = searchData.title;
    params.content = searchData.content;
  }
  // 搜索标题
  else if (searchData.type==SearchType.Title) {
    params.title = searchData.title;
  }
  // 搜索内容
  else if (searchData.type==SearchType.Content) {
    params.content = searchData.content;
  }
  // 搜索标签
  else if (searchData.type==SearchType.LabelId) {
    params.labelId = searchData.labelId;
  }
  // 搜索分类
  else if (searchData.type==SearchType.SortId) {
    params.sortId = searchData.sortId;
  }
  return useDefaultRequest.get<[]>(BASE_URL, params);
}

