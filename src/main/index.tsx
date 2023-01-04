import React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "../presentation/pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: () => {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: false }), 3000)
      );
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<RouterProvider router={router} />);
