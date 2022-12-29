import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";

jest.mock("axios");

interface SutTypes {
  sut: AxiosHttpClient;
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
};

describe("Axios HTTP Client", () => {
  it("should call axios with correct url", async () => {
    const url = faker.internet.url();

    const { sut } = makeSut();

    await sut.post({ url });

    expect(axios.post).toHaveBeenCalledWith(url);
  });
});
