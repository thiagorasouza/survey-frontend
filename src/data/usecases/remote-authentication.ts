import { AccountModel } from "../../domain/models/account-model";
import {
  Authentication,
  AuthenticationParams,
} from "../../domain/usecases/authentication";
import { HttpPostClient } from "../protocols/http/http-post-client";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url });
    return {} as AccountModel;
  }
}
