import { SurveyResultModel } from "../models/survey-result-model";

export interface LoadSurveyResult {
  load(surveyId: string, accesToken: string): Promise<SurveyResultModel>;
}
