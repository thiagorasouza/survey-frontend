import { NotFoundError } from "../../domain/errors/not-found-error";
import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { SurveyResultModel } from "../../domain/models/survey-result-model";
import { LoadSurveyResult } from "../../domain/usecases/load-survey-result";
import { ErrorResponseBody } from "../protocols/error/error-response-body";
import { HttpGetClient } from "../protocols/http/http-get-client";
import { HttpStatusCode } from "../protocols/http/http-response";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      SurveyResultModel | ErrorResponseBody
    >
  ) {}

  async load(
    surveyId: string,
    accessToken: string
  ): Promise<SurveyResultModel> {
    const url = this.url.replace(":surveyId", surveyId);
    console.log("🚀 ~ url", url);
    const httpResponse = await this.httpGetClient.get({ url, accessToken });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as SurveyResultModel;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
