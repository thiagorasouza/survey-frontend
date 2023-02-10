import { EmailInUseError } from "../../../src/domain/errors/email-in-use-error";
import { InvalidParamsError } from "../../../src/domain/errors/invalid-params-error";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { AddAccount } from "../../../src/domain/usecases/add-account";
import { SaveAccessToken } from "../../../src/domain/usecases/save-access-token";
import { SignupAction } from "../../../src/presentation/action/SignupAction";
import { SignupResultType } from "../../../src/presentation/action/SignupResult";
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

  it("should return response of type error on EmailInUseError", async () => {
    const { sut, addAccountStub } = makeSut();

    const error = new EmailInUseError();
    jest
      .spyOn(addAccountStub, "add")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockSignupActionArgs());

    expect(result).toEqual({
      status: "error",
      error,
    });
  });

  it("should return response of type error on InvalidParamsError", async () => {
    const { sut, addAccountStub } = makeSut();

    const error = new InvalidParamsError("any_message");
    jest
      .spyOn(addAccountStub, "add")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockSignupActionArgs());

    expect(result).toEqual({
      status: "error",
      error,
    });
  });

  it("should return response of type error UnexpectedError", async () => {
    const { sut, addAccountStub } = makeSut();

    const error = new UnexpectedError();
    jest
      .spyOn(addAccountStub, "add")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockSignupActionArgs());

    expect(result).toEqual({
      status: "error",
      error,
    });
  });

  it("should call SaveAccessToken with correct values on success", async () => {
    const { sut, saveAccessTokenStub } = makeSut();

    const saveSpy = jest.spyOn(saveAccessTokenStub, "save");

    await sut.handle(mockSignupActionArgs());

    expect(saveSpy).toHaveBeenCalledWith(fakeAccountModel.accessToken);
  });

  it("should return response of type unexpected error if SaveAccessToken throws", async () => {
    const { sut, saveAccessTokenStub } = makeSut();

    const error = new UnexpectedError();
    jest
      .spyOn(saveAccessTokenStub, "save")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockSignupActionArgs());

    expect(result).toEqual({
      status: "error",
      error,
    });
  });

  it("should return response of type success with account model on success", async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockSignupActionArgs());

    expect(result).toEqual({
      status: "success",
      data: fakeAccountModel,
    });
  });
});
