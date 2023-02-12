import { GetAccessToken } from "../../domain/usecases/get-acces-token";
import { GetStorage } from "../protocols/cache/get-storage";

export class LocalGetAccessToken implements GetAccessToken {
  constructor(private readonly getStorage: GetStorage) {}

  async get(): Promise<string> {
    return await this.getStorage.get("accessToken");
  }
}
