import { LocalGetAccessToken } from "../../data/usecases/local-get-access-token";
import { RemoteLoadSurveyResult } from "../../data/usecases/remote-load-survey-result";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { SurveyResultLoader } from "../../presentation/loaders/SurveyResultLoader";
import { makeApiUrl } from "./api-url-factory";

export const makeSurveyResultLoader = (): SurveyResultLoader => {
  const surveysUrl = makeApiUrl("/surveys/:surveyId/results");
  const axiosClient = new AxiosHttpClient();
  const loadSurveyResult = new RemoteLoadSurveyResult(surveysUrl, axiosClient);
  const localStorageAdapter = new LocalStorageAdapter();
  const getAccessToken = new LocalGetAccessToken(localStorageAdapter);
  return new SurveyResultLoader(loadSurveyResult, getAccessToken);
};
