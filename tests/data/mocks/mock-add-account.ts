import { AccountModel } from "../../../src/domain/models/account-model";
import { AddAccount } from "../../../src/domain/usecases/add-account";
import { mockAccountModel } from "./mock-account-model";

export const mockAddAccount = (
  fakeAccountModel: AccountModel = mockAccountModel()
): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(): Promise<AccountModel> {
      return fakeAccountModel;
    }
  }

  return new AddAccountStub();
};
