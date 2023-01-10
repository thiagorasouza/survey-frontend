/**
 * @jest-environment jsdom
 */

import { faker } from "@faker-js/faker";
import { LocalStorageAdapter } from "../../../src/infra/cache/local-storage-adapter";

interface SutTypes {
  sut: LocalStorageAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter();
  return { sut };
};

describe("Local Storage Adapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should call localStorage.setItem with correct values", async () => {
    const { sut } = makeSut();

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const key = faker.database.column();
    const value = faker.random.word();
    await sut.set(key, value);

    expect(setItemSpy).toHaveBeenCalledWith(key, value);
  });

  it("should throw if localStorage.setItem throws", async () => {
    const { sut } = makeSut();

    const error = new Error();
    jest.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
      throw error;
    });

    const key = faker.database.column();
    const value = faker.random.word();
    const promise = sut.set(key, value);

    expect(promise).rejects.toThrow(error);
  });
});
