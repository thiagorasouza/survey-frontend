import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusCode,
} from "../../../src/data/protocols/http/http-response";
import { AccountModel } from "../../../src/domain/models/account-model";
import { AuthenticationParams } from "../../../src/domain/usecases/authentication";

export const mockHttpPostClient = (): HttpPostClient<
  AuthenticationParams,
  AccountModel
> => {
  class HttpPostClientStub
    implements HttpPostClient<AuthenticationParams, AccountModel>
  {
    async post(): Promise<HttpResponse<AccountModel>> {
      return {
        statusCode: HttpStatusCode.noContent,
      };
    }
  }

  return new HttpPostClientStub();
};
