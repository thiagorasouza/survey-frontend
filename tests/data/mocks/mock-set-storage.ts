import { SetStorage } from "../../../src/data/protocols/cache/set-storage";

export const mockSetStorage = (): SetStorage => {
  class SetStorageStub implements SetStorage {
    async set(key: string, value: string): Promise<void> {
      return;
    }
  }

  return new SetStorageStub();
};
