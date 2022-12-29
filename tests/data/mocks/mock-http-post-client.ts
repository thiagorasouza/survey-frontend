import { HttpPostClient } from "../../../src/data/protocols/http/http-post-client";

export const makeHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post(): Promise<void> {
      return;
    }
  }

  return new HttpPostClientStub();
};
