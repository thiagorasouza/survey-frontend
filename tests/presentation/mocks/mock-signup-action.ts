import { ActionHandler } from "../../../src/presentation/action/ActionHandler";
import { ActionResult } from "../../../src/presentation/action/ActionResult";
import { mockAccountModel } from "../../data/mocks/mock-account-model";

export const mockSignupAction = () => {
  class SignupActionStub implements ActionHandler {
    async handle(): Promise<ActionResult> {
      return {
        status: "success",
        data: mockAccountModel(),
      };
    }
  }

  return new SignupActionStub();
};
