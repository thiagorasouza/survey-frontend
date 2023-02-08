import React from "react";
import SignupPage from "../../presentation/pages/SignupPage";

export const signupRoute = {
  path: "/signup",
  element: <SignupPage />,
  action: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return null;
  },
};
