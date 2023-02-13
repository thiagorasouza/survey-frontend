import { SurveyResultModel } from "../models/survey-result-model";

export interface SaveSurveyResult {
  save(
    surveyId: string,
    answer: string,
    accesToken: string
  ): Promise<SurveyResultModel>;
}
