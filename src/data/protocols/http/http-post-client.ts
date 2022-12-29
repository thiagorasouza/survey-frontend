import { HttpResponse } from "./http-response";

export interface HttpPostParams<RequestBody> {
  url: string;
  body?: RequestBody;
}

export interface HttpPostClient<RequestBody, ResponseBody> {
  post(
    params: HttpPostParams<RequestBody>
  ): Promise<HttpResponse<ResponseBody>>;
}
