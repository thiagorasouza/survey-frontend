import { SaveAccessToken } from "../../../src/domain/usecases/save-access-token";

export const mockSaveAccessToken = (): SaveAccessToken => {
  class SaveAccessTokenStub implements SaveAccessToken {
    async save(accessToken: string): Promise<void> {
      return;
    }
  }

  return new SaveAccessTokenStub();
};
