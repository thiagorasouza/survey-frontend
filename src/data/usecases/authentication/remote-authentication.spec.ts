import { HttpPostClient } from "data/protocols/http/http-post-client";
import { AuthenticationParams } from "domain/usecases/authentication";
import { RemoteAuthentication } from "./remote-authentication";

const makeHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post(): Promise<void> {
      return;
    }
  }

  return new HttpPostClientStub();
};

interface SutTypes {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient;
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientStub = makeHttpPostClient();
  const sut = new RemoteAuthentication(url, httpPostClientStub);
  return { sut, httpPostClientStub };
};

const mockAuthenticationParams = (): AuthenticationParams => ({
  email: "any_email@email.com",
  password: "any_password",
});

describe("Remote Authentication", () => {
  it("should call HttpPostClient with the correct URL", async () => {
    const url = "any_url";
    const { sut, httpPostClientStub } = makeSut(url);

    const postSpy = jest.spyOn(httpPostClientStub, "post");

    await sut.auth(mockAuthenticationParams());

    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(url);
  });
});
