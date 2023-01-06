import { AxiosHttpClient } from "../../../../src/infra/http/axios/axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../../src/data/protocols/http/http-post-client";

jest.mock("axios");

const successResponse = {
  status: faker.datatype.number(),
  data: { any_key: "any_value" },
};

jest.spyOn(axios, "post").mockImplementation(async () => successResponse);

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

  it("should return statusCode and body on success 2XX responses", async () => {
    const { sut } = makeSut();

    const postParams: HttpPostParams<any> = {
      url: faker.internet.url(),
      body: { any_key: "any_value" },
    };

    const result = await sut.post(postParams);

    expect(result?.statusCode).toBe(successResponse.status);
    expect(result?.body).toEqual(successResponse.data);
  });
});
