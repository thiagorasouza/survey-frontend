import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loginRoute } from "./routes/loginRoute";
import { signupRoute } from "./routes/signupRoute";

const router = createBrowserRouter([loginRoute, signupRoute]);

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<RouterProvider router={router} />);
