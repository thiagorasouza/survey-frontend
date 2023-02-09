import { ActionFunctionArgs } from "react-router-dom";
import { EmailInUseError } from "../../domain/errors/email-in-use-error";
import { InvalidParamsError } from "../../domain/errors/invalid-params-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { AddAccount } from "../../domain/usecases/add-account";
import { SaveAccessToken } from "../../domain/usecases/save-access-token";
import { SignupResult, SignupResultType } from "./SignupResult";

export class SignupAction {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly saveAccessToken: SaveAccessToken
  ) {}
  async handle(args: ActionFunctionArgs): Promise<SignupResult> {
    const { request } = args;

    const formData = await request.formData();
    const name = formData.get("name") as any;
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;
    const passwordConfirmation = formData.get("passwordConfirmation") as any;

    try {
      const accountModel = await this.addAccount.add({
        name,
        email,
        password,
        passwordConfirmation,
      });
      await this.saveAccessToken.save(accountModel.accessToken);
      return {
        type: SignupResultType.Success,
        data: accountModel,
      };
    } catch (error) {
      switch (error.constructor) {
        case EmailInUseError:
          return {
            type: SignupResultType.EmailInUseError,
            data: error.message,
          };
        case InvalidParamsError:
          return {
            type: SignupResultType.InvalidParamsError,
            data: error.message,
          };
        case UnexpectedError:
        default:
          return {
            type: SignupResultType.UnexpectedError,
            data: "Unexpected error. Please try again later.",
          };
      }
    }
  }
}
