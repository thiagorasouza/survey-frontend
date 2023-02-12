import { LocalGetAccessToken } from "../../data/usecases/local-get-access-token";
import { RemoteLoadSurveys } from "../../data/usecases/remote-load-surveys";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { SurveysLoader } from "../../presentation/loaders/SurveysLoader";
import { makeApiUrl } from "./api-url-factory";

export const makeSurveysLoader = (): SurveysLoader => {
  const surveysUrl = makeApiUrl("/surveys");
  const axiosClient = new AxiosHttpClient();
  const loadSurveys = new RemoteLoadSurveys(surveysUrl, axiosClient);
  const localStorageAdapter = new LocalStorageAdapter();
  const getAccessToken = new LocalGetAccessToken(localStorageAdapter);
  return new SurveysLoader(loadSurveys, getAccessToken);
};
