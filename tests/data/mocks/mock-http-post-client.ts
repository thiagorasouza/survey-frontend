import { ErrorResponseBody } from "../../../src/data/protocols/error/error-response-body";
import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusCode,
} from "../../../src/data/protocols/http/http-response";

export const mockHttpPostClient = <RequestBody, ResponseBody>(): HttpPostClient<
  RequestBody,
  ResponseBody
> => {
  class HttpPostClientStub
    implements HttpPostClient<RequestBody, ResponseBody>
  {
    async post(): Promise<HttpResponse<ResponseBody>> {
      return {
        statusCode: HttpStatusCode.noContent,
      };
    }
  }

  return new HttpPostClientStub();
};
