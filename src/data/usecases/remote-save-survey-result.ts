import { InvalidAnswerError } from "../../domain/errors/InvalidAnswerError";
import { NotFoundError } from "../../domain/errors/not-found-error";
import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { SurveyResultModel } from "../../domain/models/survey-result-model";
import { SaveSurveyResult } from "../../domain/usecases/save-survey-result";
import { ErrorResponseBody } from "../protocols/error/error-response-body";
import { HttpPutClient } from "../protocols/http/http-put-client";
import { HttpStatusCode } from "../protocols/http/http-response";

interface SaveSurveyParams {
  answer: string;
}

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<
      SaveSurveyParams,
      SurveyResultModel | ErrorResponseBody
    >
  ) {}

  async save(
    surveyId: string,
    answer: string,
    accessToken: string
  ): Promise<SurveyResultModel> {
    const url = this.url.replace(":surveyId", surveyId);
    const httpResponse = await this.httpPutClient.put({
      url,
      body: { answer },
      accessToken,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as SurveyResultModel;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.forbidden:
        throw new InvalidAnswerError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
