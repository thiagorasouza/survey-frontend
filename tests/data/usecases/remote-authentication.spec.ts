import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "../../../src/data/usecases/remote-authentication";
import { mockAuthenticationParams } from "../mocks/mock-authentication-params";
import { makeHttpPostClient } from "../mocks/mock-http-post-client";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "../../../src/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "../../../src/data/protocols/http/http-response";

interface SutTypes {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = makeHttpPostClient();
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

    expect(promise).rejects.toThrow();
  });
});
