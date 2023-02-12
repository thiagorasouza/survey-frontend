import React from "react";
import SurveyResultPage from "../../presentation/pages/SurveyResultPage";
import { makeSurveyResultLoader } from "../factories/surveyResultLoaderFactory";

const surveyResultLoader = makeSurveyResultLoader();

export const surveyResultRoute = {
  path: "/surveys/:surveyId/results",
  element: <SurveyResultPage />,
  loader: surveyResultLoader.handle.bind(surveyResultLoader),
};
