import axios from "axios";
import {
  HttpGetClient,
  HttpGetParams,
} from "../../../data/protocols/http/http-get-client";
import {
  HttpPostClient,
  HttpPostParams,
} from "../../../data/protocols/http/http-post-client";
import {
  HttpPutClient,
  HttpPutParams,
} from "../../../data/protocols/http/http-put-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";

export class AxiosHttpClient
  implements
    HttpPostClient<any, any>,
    HttpGetClient<any>,
    HttpPutClient<any, any>
{
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

  async put(params: HttpPutParams<any>): Promise<HttpResponse<any>> {
    console.log("🚀 ~ params", params);
    let response;
    try {
      response = await axios.put(params.url, params.body, {
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
