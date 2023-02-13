import { ActionFunctionArgs } from "react-router-dom";
import { InvalidAnswerError } from "../../domain/errors/InvalidAnswerError";
import { NotFoundError } from "../../domain/errors/not-found-error";
import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { GetAccessToken } from "../../domain/usecases/get-acces-token";
import { SaveSurveyResult } from "../../domain/usecases/save-survey-result";
import { ActionHandler } from "./ActionHandler";
import { ActionResult } from "./ActionResult";

export class SurveyResultAction implements ActionHandler {
  constructor(
    private readonly saveSurveyResult: SaveSurveyResult,
    private readonly getAccessToken: GetAccessToken
  ) {}
  async handle({ params, request }: ActionFunctionArgs): Promise<ActionResult> {
    const { surveyId } = params;

    const formData = await request.formData();
    const answer = formData.get("answer") as any;

    try {
      const accessToken = await this.getAccessToken.get();
      console.log("🚀 ~ accessToken", accessToken);
      const surveys = await this.saveSurveyResult.save(
        surveyId,
        answer,
        accessToken
      );
      return {
        status: "success",
        data: surveys,
      };
    } catch (error) {
      switch (error.constructor) {
        case NotFoundError:
        case UnauthorizedError:
        case InvalidAnswerError:
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
