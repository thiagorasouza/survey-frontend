import { EmailInUseError } from "../../domain/errors/email-in-use-error";
import { InvalidParamsError } from "../../domain/errors/invalid-params-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { AccountModel } from "../../domain/models/account-model";
import {
  AddAccount,
  AddAccountParams,
} from "../../domain/usecases/add-account";
import { ErrorResponseBody } from "../protocols/error/error-response-body";
import { HttpPostClient } from "../protocols/http/http-post-client";
import { HttpStatusCode } from "../protocols/http/http-response";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel | ErrorResponseBody
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as AccountModel;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(
          (httpResponse.body as ErrorResponseBody).error
        );
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
      default:
        return;
    }
  }
}
