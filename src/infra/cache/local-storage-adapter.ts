import { GetStorage } from "../../data/protocols/cache/get-storage";
import { SetStorage } from "../../data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  async set(key: string, value: string): Promise<void> {
    window.localStorage.setItem(key, value);
  }

  async get(key: string): Promise<string> {
    return window.localStorage.getItem(key);
  }
}
