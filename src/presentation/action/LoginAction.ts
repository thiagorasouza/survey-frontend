import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { Authentication } from "../../domain/usecases/authentication";

export interface LoginResult {
  success: boolean;
  error: boolean;
}

export class LoginAction {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: Request): Promise<LoginResult> {
    const formData = await request.formData();
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;

    try {
      await this.authentication.auth({ email, password });
    } catch (error) {
      switch (error.constructor) {
        case InvalidCredentialsError:
          return { success: false, error: false };
        case UnexpectedError:
          return { success: false, error: true };
      }
    }
  }
}
