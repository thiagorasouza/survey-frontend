import { EmailInUseError } from "../../domain/errors/email-in-use-error";
import { InvalidParamsError } from "../../domain/errors/invalid-params-error";
import { AccountModel } from "../../domain/models/account-model";
import {
  AddAccount,
  AddAccountParams,
} from "../../domain/usecases/add-account";
import { HttpPostClient } from "../protocols/http/http-post-client";
import { HttpStatusCode } from "../protocols/http/http-response";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body);
      default:
        return;
    }
  }
}
