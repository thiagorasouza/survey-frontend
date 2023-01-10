import { faker } from "@faker-js/faker";
import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import { RemoteAddAccount } from "../../../src/data/usecases/remote-add-account";
import { AccountModel } from "../../../src/domain/models/account-model";
import { AddAccountParams } from "../../../src/domain/usecases/add-account";
import { mockAddAccountParams } from "../mocks/mock-add-account-params";
import { mockHttpPostClient } from "../mocks/mock-http-post-client";

interface SutTypes {
  sut: RemoteAddAccount;
  httpPostClientStub: HttpPostClient<AddAccountParams, AccountModel>;
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
});
