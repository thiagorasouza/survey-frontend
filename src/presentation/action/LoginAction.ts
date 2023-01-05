import { Authentication } from "../../domain/usecases/authentication";

export class LoginAction {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: Request): Promise<Response> {
    const formData = await request.formData();
    const email = formData.get("email") as any;
    const password = formData.get("password") as any;
    await this.authentication.auth({ email, password });
    return;
  }
}
