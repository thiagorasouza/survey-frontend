import { AccountModel } from "../../../src/domain/models/account-model";
import { Authentication } from "../../../src/domain/usecases/authentication";
import { mockAccountModel } from "./mock-account-model";

export const mockAuthentication = (
  fakeAccountModel: AccountModel = mockAccountModel()
): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(): Promise<AccountModel> {
      return fakeAccountModel;
    }
  }

  return new AuthenticationStub();
};
