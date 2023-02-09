import { ActionFunctionArgs } from "react-router-dom";
import { AddAccount } from "../../domain/usecases/add-account";
import { SaveAccessToken } from "../../domain/usecases/save-access-token";

export class SignupAction {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly saveAccessToken: SaveAccessToken
  ) {}
  async handle(args: ActionFunctionArgs): Promise<void> {
    const { request } = args;

    const formData = await request.formData();
    const name = formData.get("name") as any;
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;
    const passwordConfirmation = formData.get("passwordConfirmation") as any;

    await this.addAccount.add({ name, email, password, passwordConfirmation });
    return;
  }
}
