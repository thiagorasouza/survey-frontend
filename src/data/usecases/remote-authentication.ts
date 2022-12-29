import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { AccountModel } from "../../domain/models/account-model";
import {
  Authentication,
  AuthenticationParams,
} from "../../domain/usecases/authentication";
import { HttpPostClient } from "../protocols/http/http-post-client";
import { HttpStatusCode } from "../protocols/http/http-response";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound:
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
    }
  }
}
