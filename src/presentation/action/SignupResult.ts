export interface SignupResult {
  type: SignupResultType;
  data?: any;
}

export enum SignupResultType {
  Success = "success",
  EmailInUseError = "email_in_use",
  InvalidParamsError = "invalid_params",
}
