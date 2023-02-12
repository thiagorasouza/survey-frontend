import { UnauthorizedError } from "../../domain/errors/unauthorized-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { GetAccessToken } from "../../domain/usecases/get-acces-token";
import { LoadSurveys } from "../../domain/usecases/load-surveys";
import { LoaderHandler } from "./LoaderHandler";
import { LoaderResult } from "./LoaderResult";

export class SurveysLoader implements LoaderHandler {
  constructor(
    private readonly loadSurveys: LoadSurveys,
    private readonly getAccessToken: GetAccessToken
  ) {}
  async handle(): Promise<LoaderResult> {
    try {
      const accessToken = await this.getAccessToken.get();
      const surveys = await this.loadSurveys.load(accessToken);
      return {
        status: "success",
        data: surveys,
      };
    } catch (error) {
      switch (error.constructor) {
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
