import { faker } from "@faker-js/faker";
import { mockAccountModel } from "../../../tests/data/mocks/mock-account-model";
import { mockAuthenticationParams } from "../../../tests/data/mocks/mock-authentication-params";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
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

const mockRequest = (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Request => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const url = `${faker.internet.url()}/login`;

  const request = new Request(url, {
    method: "POST",
    body: formData,
  });

  return request;
};

describe("LoginAction Test Suite", () => {
  it("should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, "auth");

    const fakeData = mockAuthenticationParams();
    const fakeRequest = mockRequest(fakeData.email, fakeData.password);

    await sut.handle(fakeRequest);

    expect(authSpy).toHaveBeenCalledWith(fakeData);
  });

  it("should return success false on invalid credentials", async () => {
    const { sut, authenticationStub } = makeSut();

    const invalidCredentials = new InvalidCredentialsError();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.reject(invalidCredentials));

    const result = await sut.handle(mockRequest());

    expect(result).toEqual({ success: false });
  });
});
