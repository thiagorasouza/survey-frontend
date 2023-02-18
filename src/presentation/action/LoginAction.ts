import { ActionFunctionArgs } from "react-router-dom";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
import { InvalidParamsError } from "../../domain/errors/invalid-params-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { Authentication } from "../../domain/usecases/authentication";
import { SaveAccessToken } from "../../domain/usecases/save-access-token";
import { ActionHandler } from "./ActionHandler";
import { ActionResult } from "./ActionResult";

export class LoginAction implements ActionHandler {
  constructor(
    private readonly authentication: Authentication,
    private readonly saveAccessToken: SaveAccessToken
  ) {}

  async handle(args: ActionFunctionArgs): Promise<ActionResult> {
    const { request } = args;

    const formData = await request.formData();
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;

    try {
      const accountModel = await this.authentication.auth({ email, password });
      await this.saveAccessToken.save(accountModel.accessToken);
      return {
        status: "success",
        data: accountModel,
      };
    } catch (error) {
      switch (error.constructor) {
        case InvalidCredentialsError:
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
