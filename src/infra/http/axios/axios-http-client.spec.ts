import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../data/protocols/http/http-post-client";

jest.mock("axios");

interface SutTypes {
  sut: AxiosHttpClient;
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
};

describe("Axios HTTP Client", () => {
  it("should call axios with correct values", async () => {
    const { sut } = makeSut();

    const postParams: HttpPostParams<any> = {
      url: faker.internet.url(),
      body: { any_key: "any_value" },
    };

    await sut.post(postParams);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(postParams.url, postParams.body);
  });
});
