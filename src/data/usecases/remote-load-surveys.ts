import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { SurveyModel } from "../../domain/models/survey-model";
import { LoadSurveys } from "../../domain/usecases/load-surveys";
import { ErrorResponseBody } from "../protocols/error/error-response-body";
import { HttpGetClient } from "../protocols/http/http-get-client";
import { HttpStatusCode } from "../protocols/http/http-response";

export class RemoteLoadSurveys implements LoadSurveys {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      SurveyModel[] | ErrorResponseBody
    >
  ) {}

  async load(accessToken: string): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      accessToken,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as SurveyModel[];
      case HttpStatusCode.noContent:
        return;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedError();
    }
  }
}
