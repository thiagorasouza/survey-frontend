import { LocalGetAccessToken } from "../../data/usecases/local-get-access-token";
import { RemoteSaveSurveyResult } from "../../data/usecases/remote-save-survey-result";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "../../infra/http/axios/axios-http-client";
import { SurveyResultAction } from "../../presentation/action/SurveyResultAction";
import { makeApiUrl } from "./api-url-factory";

export const makeSurveyResultAction = (): SurveyResultAction => {
  const surveysUrl = makeApiUrl("/surveys/:surveyId/results");
  const axiosClient = new AxiosHttpClient();
  const loadSurveyResult = new RemoteSaveSurveyResult(surveysUrl, axiosClient);
  const localStorageAdapter = new LocalStorageAdapter();
  const getAccessToken = new LocalGetAccessToken(localStorageAdapter);
  return new SurveyResultAction(loadSurveyResult, getAccessToken);
};
