import React from "react";
import SurveysPage from "../../presentation/pages/SurveysPage";
import { makeSurveysLoader } from "../factories/surveysLoaderFactory";

const surveysLoader = makeSurveysLoader();

export const surveysRoute = {
  path: "/surveys",
  element: <SurveysPage />,
  loader: surveysLoader.handle.bind(surveysLoader),
};
