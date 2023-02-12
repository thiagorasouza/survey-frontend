import { HttpResponse } from "./http-response";

export interface HttpGetParams {
  url: string;
  accessToken: string;
}

export interface HttpGetClient<ResponseBody> {
  get(params: HttpGetParams): Promise<HttpResponse<ResponseBody>>;
}
