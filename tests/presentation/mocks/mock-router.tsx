import React, { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ActionHandler } from "../../../src/presentation/action/ActionHandler";

export const mockRouter = (
  element: ReactElement,
  action: ActionHandler
): ReactElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element,
        action: (args) => action.handle(args),
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
