import { AccountModel } from "../../domain/models/account-model";
import {
  AddAccount,
  AddAccountParams,
} from "../../domain/usecases/add-account";
import { HttpPostClient } from "../protocols/http/http-post-client";

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
    return;
  }
}
