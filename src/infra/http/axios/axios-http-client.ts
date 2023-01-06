import axios from "axios";
import {
  HttpPostClient,
  HttpPostParams,
} from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response;
    try {
      response = await axios.post(params.url, params.body);
    } catch (error) {
      response = error.response;
    }

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
