import axios from "axios";
import { HttpGetParams } from "../../../data/protocols/http/http-get-client";
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

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    let response;
    try {
      response = await axios.get(params.url, {
        headers: {
          "x-access-token": params.accessToken,
        },
      });
    } catch (error) {
      response = error.response;
    }

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
