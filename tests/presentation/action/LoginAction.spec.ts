import { mockAccountModel } from "../../data/mocks/mock-account-model";
import { mockAuthenticationParams } from "../../data/mocks/mock-authentication-params";
import { InvalidCredentialsError } from "../../../src/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { Authentication } from "../../../src/domain/usecases/authentication";
import { LoginAction } from "../../../src/presentation/action/LoginAction";
import { LoginResultType } from "../../../src/presentation/action/LoginResult";
import { mockActionArgs } from "../mocks/mock-action-args";
import { mockAuthentication } from "../../data/mocks/mock-authentication";
import { mockSaveAccessToken } from "../../data/mocks/mock-save-access-token";
import { SaveAccessToken } from "../../../src/domain/usecases/save-access-token";

interface SutTypes {
  sut: LoginAction;
  authenticationStub: Authentication;
  saveAccessTokenStub: SaveAccessToken;
}

const fakeAccountModel = mockAccountModel();

const makeSut = (): SutTypes => {
  const saveAccessTokenStub = mockSaveAccessToken();
  const authenticationStub = mockAuthentication(fakeAccountModel);
  const sut = new LoginAction(authenticationStub, saveAccessTokenStub);
  return { sut, authenticationStub, saveAccessTokenStub };
};

describe("LoginAction Test Suite", () => {
  it("should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, "auth");

    const authParams = mockAuthenticationParams();
    const actionArgs = mockActionArgs(authParams.email, authParams.password);

    await sut.handle(actionArgs);

    expect(authSpy).toHaveBeenCalledWith(authParams);
  });

  it("should return response of type invalid credentials on InvalidCredentials", async () => {
    const { sut, authenticationStub } = makeSut();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ type: LoginResultType.InvalidCredentials });
  });

  it("should return response of type unexpected error on UnexpectedError", async () => {
    const { sut, authenticationStub } = makeSut();

    const error = new UnexpectedError();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ type: LoginResultType.UnexpectedError });
  });

  it("should call SaveAccessToken with correct values on success", async () => {
    const { sut, saveAccessTokenStub } = makeSut();

    const saveSpy = jest.spyOn(saveAccessTokenStub, "save");

    await sut.handle(mockActionArgs());

    expect(saveSpy).toHaveBeenCalledWith(fakeAccountModel.accessToken);
  });

  it("should return response of type unexpected error if SaveAccessToken throws", async () => {
    const { sut, saveAccessTokenStub } = makeSut();

    const error = new UnexpectedError();
    jest
      .spyOn(saveAccessTokenStub, "save")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ type: LoginResultType.UnexpectedError });
  });

  it("should return response of type success with account model on success", async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({
      type: LoginResultType.Success,
      data: fakeAccountModel,
    });
  });
});
