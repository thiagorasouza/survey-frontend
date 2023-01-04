/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

import Login from "./Login";
import { faker } from "@faker-js/faker";

import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

const getEmailInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/email/i);

const getPasswordInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/password/i);

const getLoginButton = (): HTMLButtonElement =>
  screen.getByRole("button", { name: /login/i });

const getSpinner = (): HTMLButtonElement => screen.getByLabelText("spinner");

const getSignupButton = (): HTMLButtonElement => screen.getByText(/sign ?up/i);

interface SutTypes {
  sut: ReactElement;
  user: UserEvent;
}

const mockRouter = (element: ReactElement): ReactElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element,
        action: () => {
          return null;
        },
      },
    ],
    {
      initialEntries: ["/"],
      initialIndex: 0,
    }
  );
  return <RouterProvider router={router} />;
};

const makeSut = (): SutTypes => {
  const sut = mockRouter(<Login />);
  const user = userEvent.setup();
  return { sut, user };
};

describe("Login Page Test Suite", () => {
  describe("Initial state", () => {
    it("should have an enabled email input", () => {
      const { sut } = makeSut();
      render(sut);
      expect(getEmailInput()).not.toBeDisabled();
    });

    it("should have an enabled password input", () => {
      const { sut } = makeSut();
      render(sut);
      expect(getPasswordInput()).not.toBeDisabled();
    });

    it("should have an enabled login button", () => {
      const { sut } = makeSut();
      render(sut);
      expect(getLoginButton()).not.toBeDisabled();
    });

    it("should have an enabled signup button", () => {
      const { sut } = makeSut();
      render(sut);
      expect(getSignupButton()).not.toBeDisabled();
    });
  });

  describe("Submitting state", () => {
    const fillLoginForm = async (user): Promise<void> => {
      const emailInput = getEmailInput();
      const fakeEmail = faker.internet.email();
      await user.clear(emailInput);
      await user.type(emailInput, fakeEmail);

      const passwordInput = getPasswordInput();
      const fakePassword = faker.internet.password();
      await user.clear(passwordInput);
      await user.type(passwordInput, fakePassword);
    };

    const clickLoginButton = async (user): Promise<void> => {
      const loginButton = getLoginButton();
      user.click(loginButton);
    };

    it("should disable email input", async () => {
      const { sut, user } = makeSut();

      render(sut);

      await fillLoginForm(user);
      await clickLoginButton(user);

      await waitFor(() => expect(getEmailInput()).toBeDisabled());
    });

    it("should disable password input", async () => {
      const { sut, user } = makeSut();

      render(sut);

      await fillLoginForm(user);
      await clickLoginButton(user);

      await waitFor(() => expect(getPasswordInput()).toBeDisabled());
    });

    it("should disable login button", async () => {
      const { sut, user } = makeSut();

      render(sut);

      await fillLoginForm(user);
      await clickLoginButton(user);

      await waitFor(() => expect(getLoginButton()).toBeDisabled());
    });

    it("should display a loading spinner", async () => {
      const { sut, user } = makeSut();

      render(sut);

      await fillLoginForm(user);
      await clickLoginButton(user);

      await waitFor(() => expect(getSpinner()));
    });
  });
});
