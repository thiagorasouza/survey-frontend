import { faker } from "@faker-js/faker";
import { ActionFunctionArgs } from "react-router-dom";
import { mockAccountModel } from "../../../tests/data/mocks/mock-account-model";
import { mockAuthenticationParams } from "../../../tests/data/mocks/mock-authentication-params";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { AccountModel } from "../../domain/models/account-model";
import { Authentication } from "../../domain/usecases/authentication";
import { LoginAction } from "./LoginAction";

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new AuthenticationStub();
};

interface SutTypes {
  sut: LoginAction;
  authenticationStub: Authentication;
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication();
  const sut = new LoginAction(authenticationStub);
  return { sut, authenticationStub };
};

const mockActionArgs = (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): ActionFunctionArgs => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const url = `${faker.internet.url()}/login`;

  const request = new Request(url, {
    method: "POST",
    body: formData,
  });

  return { request, params: {} };
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

  it("should return success false on invalid credentials", async () => {
    const { sut, authenticationStub } = makeSut();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ success: false, error: false });
  });

  it("should return error true on UnexpectedError", async () => {
    const { sut, authenticationStub } = makeSut();

    const error = new UnexpectedError();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ success: false, error: true });
  });

  it("should return success true on success", async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockActionArgs());

    expect(result).toEqual({ success: true, error: false });
  });
});
