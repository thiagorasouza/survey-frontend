export interface SurveyResultModel {
  surveyId: string;
  question: string;
  answers: {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswer: boolean;
  }[];
  date: Date;
}
