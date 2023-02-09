import { LocalSaveAccessToken } from "../../data/usecases/local-save-access-token";
import { RemoteAddAccount } from "../../data/usecases/remote-add-account";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { SignupAction } from "../../presentation/action/SignupAction";
import { makeApiUrl } from "./api-url-factory";

export const makeSignupAction = (): SignupAction => {
  const signupUrl = makeApiUrl("/signup");
  const axiosClient = new AxiosHttpClient();
  const addAccount = new RemoteAddAccount(signupUrl, axiosClient);
  const localStorageAdapter = new LocalStorageAdapter();
  const saveAccessToken = new LocalSaveAccessToken(localStorageAdapter);
  return new SignupAction(addAccount, saveAccessToken);
};
