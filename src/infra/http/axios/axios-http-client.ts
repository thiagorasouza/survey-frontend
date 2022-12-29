import axios from "axios";
import {
  HttpPostClient,
  HttpPostParams,
} from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    await axios.post(params.url);
    return;
  }
}
