import React from "react";
import LoginPage from "../../presentation/pages/LoginPage";
import { makeLoginAction } from "../factories/loginActionFactory";

const loginAction = makeLoginAction();

export const loginRoute = {
  path: "/login",
  element: <LoginPage />,
  action: loginAction.handle.bind(loginAction),
};
