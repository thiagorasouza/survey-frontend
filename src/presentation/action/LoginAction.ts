import { ActionFunctionArgs } from "react-router-dom";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { Authentication } from "../../domain/usecases/authentication";
import { LoginResult, LoginResultType } from "./LoginResult";

export class LoginAction {
  constructor(private readonly authentication: Authentication) {}

  async handle(args: ActionFunctionArgs): Promise<LoginResult> {
    const { request } = args;

    const formData = await request.formData();
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;

    try {
      const accountModel = await this.authentication.auth({ email, password });
      return {
        type: LoginResultType.Success,
        data: accountModel,
      };
    } catch (error) {
      switch (error.constructor) {
        case InvalidCredentialsError:
          return {
            type: LoginResultType.InvalidCredentials,
          };
        case UnexpectedError:
        default:
          return {
            type: LoginResultType.UnexpectedError,
          };
      }
    }
  }
}
