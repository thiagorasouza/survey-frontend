import React, { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export const mockRouter = (
  element: ReactElement,
  action: any
): ReactElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element,
        action,
      },
      {
        path: "/surveys",
        element: <div>Surveys Route</div>,
      },
    ],
    {
      initialEntries: ["/"],
      initialIndex: 0,
    }
  );

  return <RouterProvider router={router} />;
};
