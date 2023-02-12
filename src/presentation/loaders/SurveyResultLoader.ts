import { LoaderHandler } from "./LoaderHandler";
import { LoadSurveyResult } from "../../domain/usecases/load-survey-result";
import { GetAccessToken } from "../../domain/usecases/get-acces-token";
import { LoaderResult } from "./LoaderResult";
import { LoaderFunctionArgs } from "react-router-dom";
import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { NotFoundError } from "../../domain/errors/not-found-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";

export class SurveyResultLoader implements LoaderHandler {
  constructor(
    private readonly loadSurveyResult: LoadSurveyResult,
    private readonly getAccessToken: GetAccessToken
  ) {}
  async handle({ params }: LoaderFunctionArgs): Promise<LoaderResult> {
    const { surveyId } = params;

    try {
      const accessToken = await this.getAccessToken.get();
      const surveys = await this.loadSurveyResult.load(surveyId, accessToken);
      return {
        status: "success",
        data: surveys,
      };
    } catch (error) {
      switch (error.constructor) {
        case NotFoundError:
        case UnauthorizedError:
          return {
            status: "error",
            error,
          };
        default:
          return {
            status: "error",
            error: new UnexpectedError(),
          };
      }
    }
  }
}
