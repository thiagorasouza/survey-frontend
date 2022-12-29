import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "../../../src/data/usecases/remote-authentication";
import { mockAuthenticationParams } from "../mocks/mock-authentication-params";
import { makeHttpPostClient } from "../mocks/mock-http-post-client";
import { faker } from "@faker-js/faker";

interface SutTypes {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient;
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientStub = makeHttpPostClient();
  const sut = new RemoteAuthentication(url, httpPostClientStub);
  return { sut, httpPostClientStub };
};

describe("Remote Authentication", () => {
  it("should call HttpPostClient with the correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);

    const postSpy = jest.spyOn(httpPostClientStub, "post");

    await sut.auth(mockAuthenticationParams());

    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(url);
  });
});
