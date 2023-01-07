import { faker } from "@faker-js/faker";
import { SetStorage } from "../../../src/data/protocols/cache/set-storage";
import { LocalSaveAccessToken } from "../../../src/data/usecases/local-save-access-token";
import { mockSetStorage } from "../mocks/mock-set-storage";

interface SutTypes {
  sut: LocalSaveAccessToken;
  setStorageStub: SetStorage;
}

const makeSut = (): SutTypes => {
  const setStorageStub = mockSetStorage();
  const sut = new LocalSaveAccessToken(setStorageStub);
  return { sut, setStorageStub };
};

describe("LocalSaveAccessToken Test Suite", () => {
  it("should call SetStorage with correct values", async () => {
    const { sut, setStorageStub } = makeSut();

    const setStorageSpy = jest.spyOn(setStorageStub, "set");

    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);

    expect(setStorageSpy).toBeCalledWith("accessToken", accessToken);
  });

  it("should throw if SetStorage throws", async () => {
    const { sut, setStorageStub } = makeSut();

    jest
      .spyOn(setStorageStub, "set")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const accessToken = faker.datatype.uuid();
    const promise = sut.save(accessToken);

    expect(promise).rejects.toThrow(new Error());
  });
});
