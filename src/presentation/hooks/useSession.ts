import { LocalGetAccessToken } from "../../data/usecases/local-get-access-token";
import { LocalSaveAccessToken } from "../../data/usecases/local-save-access-token";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";

function useSession() {
  const localStorageAdapter = new LocalStorageAdapter();
  const getAccessToken = new LocalGetAccessToken(localStorageAdapter);
  const saveAccessToken = new LocalSaveAccessToken(localStorageAdapter);

  const getUserToken = async () => {
    return await getAccessToken.get();
  };

  const logout = async (): Promise<void> => {
    return await saveAccessToken.save("");
  };

  return { getUserToken, logout };
}

export default useSession;
