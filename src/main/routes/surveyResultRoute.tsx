import React from "react";
import SurveyResultPage from "../../presentation/pages/SurveyResultPage";
import { makeSurveyResultAction } from "../factories/surveyResultActionFactory";
import { makeSurveyResultLoader } from "../factories/surveyResultLoaderFactory";

const surveyResultLoader = makeSurveyResultLoader();
const surveyResultAction = makeSurveyResultAction();

export const surveyResultRoute = {
  path: "/surveys/:surveyId/results",
  element: <SurveyResultPage />,
  loader: surveyResultLoader.handle.bind(surveyResultLoader),
  action: surveyResultAction.handle.bind(surveyResultAction),
};
