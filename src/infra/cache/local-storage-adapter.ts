import { SetStorage } from "../../data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: string): Promise<void> {
    await window.localStorage.setItem(key, value);
    return;
  }
}
