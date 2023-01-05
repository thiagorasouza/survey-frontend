import React from "react";
import * as ReactDOM from "react-dom/client";
import LoginPage from "../presentation/pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: ({ request }) => {
      console.log("🚀 ~ request", request);
      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1000)
      );
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<RouterProvider router={router} />);
