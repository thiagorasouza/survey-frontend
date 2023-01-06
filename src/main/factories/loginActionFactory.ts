import { RemoteAuthentication } from "../../data/usecases/remote-authentication";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { LoginAction } from "../../presentation/action/LoginAction";
import { makeApiUrl } from "./api-url-factory";

export const makeLoginAction = (): LoginAction => {
  const loginUrl = makeApiUrl("/login");
  const axiosClient = new AxiosHttpClient();
  const authentication = new RemoteAuthentication(loginUrl, axiosClient);
  return new LoginAction(authentication);
};
