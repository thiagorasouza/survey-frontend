import { AuthenticationParams } from "../../../src/domain/usecases/authentication";

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: "any_email@email.com",
  password: "any_password",
});
