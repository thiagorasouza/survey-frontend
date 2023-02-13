import { HttpResponse } from "./http-response";

export interface HttpPutParams<RequestBody> {
  url: string;
  accessToken: string;
  body?: RequestBody;
}

export interface HttpPutClient<RequestBody, ResponseBody> {
  put(params: HttpPutParams<RequestBody>): Promise<HttpResponse<ResponseBody>>;
}
