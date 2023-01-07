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
  it("should call setStorage with correct values", async () => {
    const { sut, setStorageStub } = makeSut();

    const setStorageSpy = jest.spyOn(setStorageStub, "set");

    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);

    expect(setStorageSpy).toBeCalledWith("accessToken", accessToken);
  });
});
