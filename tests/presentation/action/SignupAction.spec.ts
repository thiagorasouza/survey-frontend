import { AddAccount } from "../../../src/domain/usecases/add-account";
import { SaveAccessToken } from "../../../src/domain/usecases/save-access-token";
import { SignupAction } from "../../../src/presentation/action/SignupAction";
import { mockAccountModel } from "../../data/mocks/mock-account-model";
import { mockAddAccount } from "../../data/mocks/mock-add-account";
import { mockAddAccountParams } from "../../data/mocks/mock-add-account-params";
import { mockSaveAccessToken } from "../../data/mocks/mock-save-access-token";
import { mockSignupActionArgs } from "../mocks/mock-signup-action-args";

interface SutTypes {
  sut: SignupAction;
  addAccountStub: AddAccount;
  saveAccessTokenStub: SaveAccessToken;
}

const fakeAccountModel = mockAccountModel();

const makeSut = (): SutTypes => {
  const saveAccessTokenStub = mockSaveAccessToken();
  const addAccountStub = mockAddAccount(fakeAccountModel);
  const sut = new SignupAction(addAccountStub, saveAccessTokenStub);
  return { sut, addAccountStub, saveAccessTokenStub };
};

describe("Signup Action Test Suite", () => {
  it("should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    const addParams = mockAddAccountParams();
    const actionArgs = mockSignupActionArgs(
      addParams.name,
      addParams.email,
      addParams.password
    );

    await sut.handle(actionArgs);

    expect(addSpy).toHaveBeenCalledWith(addParams);
  });
});
