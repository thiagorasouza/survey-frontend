import React from "react";
import SignupPage from "../../presentation/pages/SignupPage";
import { makeSignupAction } from "../factories/signupActionFactory";

const signupAction = makeSignupAction();

export const signupRoute = {
  path: "/signup",
  element: <SignupPage />,
  action: signupAction.handle.bind(signupAction),
};
