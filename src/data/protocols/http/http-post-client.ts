import { HttpResponse } from "./http-response";

export interface HttpPostParams {
  url: string;
  body?: any;
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
