import { SurveyModel } from "../models/survey-model";

export interface LoadSurveys {
  load(accessToken: string): Promise<SurveyModel[]>;
}
