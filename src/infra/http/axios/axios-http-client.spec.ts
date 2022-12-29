import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../data/protocols/http/http-post-client";
import { mockAxiosResponse } from "../../mocks/mock-axios-response";

jest.mock("axios");
const axiosResponse = mockAxiosResponse();
jest.spyOn(axios, "post").mockImplementation(async () => axiosResponse);

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

  it("should return statusCode and body", async () => {
    const { sut } = makeSut();

    const postParams: HttpPostParams<any> = {
      url: faker.internet.url(),
      body: { any_key: "any_value" },
    };

    const result = await sut.post(postParams);

    expect(result?.statusCode).toBe(axiosResponse.status);
    expect(result?.body).toEqual(axiosResponse.data);
  });
});
