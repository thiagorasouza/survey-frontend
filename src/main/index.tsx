import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { indexRoute } from "./routes/indexRoute";
import { loginRoute } from "./routes/loginRoute";
import { signupRoute } from "./routes/signupRoute";
import { surveyResultRoute } from "./routes/surveyResultRoute";
import { surveysRoute } from "./routes/surveysRoute";

const router = createBrowserRouter([
  indexRoute,
  loginRoute,
  signupRoute,
  surveyResultRoute,
  surveysRoute,
]);

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<RouterProvider router={router} />);
