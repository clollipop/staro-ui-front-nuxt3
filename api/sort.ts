import {useDefaultRequest} from "@/utils/request";

const BASE_URL = "/sort";

export function listSort(): Promise<any>  {
  return useDefaultRequest.get<any>(BASE_URL + "/list");
}
