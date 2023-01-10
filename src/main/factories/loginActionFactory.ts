import { LocalSaveAccessToken } from "../../data/usecases/local-save-access-token";
import { RemoteAuthentication } from "../../data/usecases/remote-authentication";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { LoginAction } from "../../presentation/action/LoginAction";
import { makeApiUrl } from "./api-url-factory";

export const makeLoginAction = (): LoginAction => {
  const loginUrl = makeApiUrl("/login");
  const axiosClient = new AxiosHttpClient();
  const authentication = new RemoteAuthentication(loginUrl, axiosClient);
  const localStorageAdapter = new LocalStorageAdapter();
  const saveAccessToken = new LocalSaveAccessToken(localStorageAdapter);
  return new LoginAction(authentication, saveAccessToken);
};
