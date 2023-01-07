import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "../../../src/data/usecases/remote-authentication";
import { mockAuthenticationParams } from "../mocks/mock-authentication-params";
import { mockHttpPostClient } from "../mocks/mock-http-post-client";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "../../../src/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "../../../src/data/protocols/http/http-response";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { AuthenticationParams } from "../../../src/domain/usecases/authentication";
import { AccountModel } from "../../../src/domain/models/account-model";
import { mockAccountModel } from "../mocks/mock-account-model";

interface SutTypes {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient<AuthenticationParams, AccountModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = mockHttpPostClient();
  const sut = new RemoteAuthentication(url, httpPostClientStub);
  return { sut, httpPostClientStub };
};

describe("Remote Authentication", () => {
  it("should call HttpPostClient with the correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    const postSpy = jest.spyOn(httpPostClientStub, "post");

    const authParams = mockAuthenticationParams();
    await sut.auth(authParams);

    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith({ url, body: authParams });
  });

  it("should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.unauthorized,
      })
    );

    const authParams = mockAuthenticationParams();
    const promise = sut.auth(authParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.badRequest,
      })
    );

    const authParams = mockAuthenticationParams();
    const promise = sut.auth(authParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.notFound,
      })
    );

    const authParams = mockAuthenticationParams();
    const promise = sut.auth(authParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.serverError,
      })
    );

    const authParams = mockAuthenticationParams();
    const promise = sut.auth(authParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should return an AccountModel if HttpPostClient returns 200", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    const accountModel = mockAccountModel();

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.ok,
        body: accountModel,
      })
    );

    const authParams = mockAuthenticationParams();
    const result = await sut.auth(authParams);

    expect(result).toEqual(accountModel);
  });
});
