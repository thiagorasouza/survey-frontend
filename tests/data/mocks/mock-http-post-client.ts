import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusCode,
} from "../../../src/data/protocols/http/http-response";

export const makeHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post(): Promise<HttpResponse> {
      return {
        statusCode: HttpStatusCode.noContent,
      };
    }
  }

  return new HttpPostClientStub();
};
