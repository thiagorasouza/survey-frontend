export interface LoginResult {
  type: LoginResultType;
  data?: any;
}

export enum LoginResultType {
  Success = "success",
  InvalidCredentials = "invalid_credentials",
  UnexpectedError = "unexpected_error",
}
