import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../data/protocols/http/http-post-client";

// jest.mock("axios", () => ({
//   __esModule: true,
//   ...jest.requireActual("axios"),
//   async post() {
//     return mockAxiosResponse();
//   },
// }));
jest.mock("axios");

interface SutTypes {
  sut: AxiosHttpClient;
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
};

const mockAxiosResponse = () => ({
  status: faker.datatype.number(),
  data: { any_key: "any_value" },
});

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

    const axiosResponse = mockAxiosResponse();
    jest.spyOn(axios, "post").mockImplementationOnce(async () => axiosResponse);

    const result = await sut.post(postParams);

    expect(result?.statusCode).toBe(axiosResponse.status);
    expect(result?.body).toEqual(axiosResponse.data);
  });
});
