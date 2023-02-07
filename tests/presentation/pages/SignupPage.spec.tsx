/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SignupPage from "../../../src/presentation/pages/SignupPage";
import {
  getEmailInput,
  getLoginButton,
  getNameInput,
  getPasswordConfirmationInput,
  getPasswordInput,
  getSignupButton,
} from "../helpers/form-helper";

const mockRouter = (element: ReactElement): ReactElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element,
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

describe("Signup Page Test Suite", () => {
  interface SutTypes {
    sut: ReactElement;
    user: UserEvent;
  }

  const makeSut = (): SutTypes => {
    const sut = mockRouter(<SignupPage />);
    const user = userEvent.setup();
    return { sut, user };
  };

  describe("Initial state", () => {
    beforeEach(() => {
      const { sut } = makeSut();
      render(sut);
    });

    it("should have an enabled name input", () => {
      expect(getNameInput()).not.toBeDisabled();
    });

    it("should have an enabled email input", () => {
      expect(getEmailInput()).not.toBeDisabled();
    });

    it("should have an enabled password input", () => {
      expect(getPasswordInput()).not.toBeDisabled();
    });

    it("should have an enabled password confirmation input", () => {
      expect(getPasswordConfirmationInput()).not.toBeDisabled();
    });

    it("should have an enabled signup button", () => {
      expect(getSignupButton()).not.toBeDisabled();
    });

    it("should have an enabled login button", () => {
      expect(getLoginButton()).not.toBeDisabled();
    });
  });
});
