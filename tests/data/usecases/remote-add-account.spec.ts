import { faker } from "@faker-js/faker";
import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../../src/data/protocols/http/http-response";
import { RemoteAddAccount } from "../../../src/data/usecases/remote-add-account";
import { EmailInUseError } from "../../../src/domain/errors/email-in-use-error";
import { InvalidParamsError } from "../../../src/domain/errors/invalid-params-error";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { AccountModel } from "../../../src/domain/models/account-model";
import { AddAccountParams } from "../../../src/domain/usecases/add-account";
import { mockAddAccountParams } from "../mocks/mock-add-account-params";
import { mockHttpPostClient } from "../mocks/mock-http-post-client";

interface SutTypes {
  sut: RemoteAddAccount;
  httpPostClientStub: HttpPostClient<AddAccountParams, AccountModel | string>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = mockHttpPostClient();
  const sut = new RemoteAddAccount(url, httpPostClientStub);
  return { sut, httpPostClientStub };
};

describe("RemoteAddAccount Test Suite", () => {
  it("should call HttpPostClient with the correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    const postSpy = jest.spyOn(httpPostClientStub, "post");

    const addParams = mockAddAccountParams();
    await sut.add(addParams);

    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith({ url, body: addParams });
  });

  it("should throw EmailInUseError if HttpPostClient returns 403", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.forbidden,
      })
    );

    const addParams = mockAddAccountParams();
    const promise = sut.add(addParams);

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it("should throw InvalidParamsError with a message if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientStub } = makeSut();

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.badRequest,
        body: "invalid_params_message",
      })
    );

    const addParams = mockAddAccountParams();
    const promise = sut.add(addParams);

    await expect(promise).rejects.toThrow(
      new InvalidParamsError("invalid_params_message")
    );
  });

  it("should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    jest.spyOn(httpPostClientStub, "post").mockReturnValueOnce(
      Promise.resolve({
        statusCode: HttpStatusCode.serverError,
      })
    );

    const addParams = mockAddAccountParams();
    const promise = sut.add(addParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
