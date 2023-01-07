/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

import LoginPage from "../../../src/presentation/pages/LoginPage";
import { faker } from "@faker-js/faker";

import { enableFetchMocks } from "jest-fetch-mock";
import { LoginResultType } from "../../../src/presentation/action/LoginResult";
enableFetchMocks();

const getEmailInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/email/i);

const getPasswordInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/password/i);

const getLoginButton = (): HTMLButtonElement =>
  screen.getByRole("button", { name: /login/i });

const getSpinner = (): HTMLSpanElement => screen.getByLabelText("spinner");

const getCheckmark = (): HTMLOrSVGElement => screen.getByLabelText("checkmark");

const getSignupButton = (): HTMLButtonElement => screen.getByText(/sign ?up/i);

const getFailureMessage = (): HTMLDivElement => screen.getByRole("alert");

interface SutTypes {
  sut: ReactElement;
  user: UserEvent;
}

const mockAction = jest.fn(() => ({ type: LoginResultType.Success }));

const mockRouter = (element: ReactElement): ReactElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element,
        action: mockAction,
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

const fillLoginForm = async (user: UserEvent): Promise<void> => {
  const emailInput = getEmailInput();
  const fakeEmail = faker.internet.email();
  await user.clear(emailInput);
  await user.type(emailInput, fakeEmail);

  const passwordInput = getPasswordInput();
  const fakePassword = faker.internet.password();
  await user.clear(passwordInput);
  await user.type(passwordInput, fakePassword);
};

const clickLoginButton = async (user: UserEvent): Promise<void> => {
  const loginButton = getLoginButton();
  user.click(loginButton);
};

const goToSubmittingState = async (user: UserEvent): Promise<void> => {
  await fillLoginForm(user);
  await clickLoginButton(user);
};

const waitForSuccessState = async (): Promise<void> => {
  await waitFor(() => expect(getCheckmark()).toBeVisible());
};

const makeSut = (): SutTypes => {
  const sut = mockRouter(<LoginPage />);
  const user = userEvent.setup();
  return { sut, user };
};

describe("Login Page Test Suite", () => {
  describe("Initial state", () => {
    beforeEach(() => {
      const { sut } = makeSut();
      render(sut);
    });

    it("should have an enabled email input", () => {
      expect(getEmailInput()).not.toBeDisabled();
    });

    it("should have an enabled password input", () => {
      expect(getPasswordInput()).not.toBeDisabled();
    });

    it("should have an enabled login button", () => {
      expect(getLoginButton()).not.toBeDisabled();
    });

    it("should have an enabled signup button", () => {
      expect(getSignupButton()).not.toBeDisabled();
    });

    it("should not display an error message", async () => {
      await waitFor(() => expect(getFailureMessage()).toHaveClass("hidden"));
    });
  });

  describe("Validation", () => {
    it("should indicate that email is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await clickLoginButton(user);
      expect(getEmailInput()).toBeInvalid();
    });

    it("should indicate that password is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await clickLoginButton(user);
      expect(getPasswordInput()).toBeInvalid();
    });
  });

  describe("Submitting state", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      await goToSubmittingState(user);
    });

    it("should disable email input", async () => {
      // expect(getEmailInput()).toBeDisabled();
      await waitFor(() => expect(getEmailInput()).toBeDisabled());
    });

    it("should disable password input", async () => {
      await waitFor(() => expect(getPasswordInput()).toBeDisabled());
    });

    it("should disable login button", async () => {
      await waitFor(() => expect(getLoginButton()).toBeDisabled());
    });

    it("should display a loading spinner", async () => {
      await waitFor(() => expect(getSpinner()));
    });

    it("should hide signup button", async () => {
      await waitFor(() => expect(getSignupButton()).not.toBeVisible());
    });

    it("should not display an error message", async () => {
      await waitFor(() => expect(getFailureMessage()).toHaveClass("hidden"));
    });
  });

  describe("Success state", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      await goToSubmittingState(user);
    });

    it("should display a checkmark", async () => {
      await waitFor(() => expect(getCheckmark()).toBeVisible());
    });

    it("should keep signup button hidden", async () => {
      await waitForSuccessState();
      expect(getSignupButton()).not.toBeVisible();
    });

    it("should keep email input disabled", async () => {
      await waitForSuccessState();
      expect(getEmailInput()).toBeDisabled();
    });

    it("should keep password input disabled", async () => {
      await waitForSuccessState();
      expect(getPasswordInput()).toBeDisabled();
    });

    it("should not display an error message", async () => {
      await waitForSuccessState();
      expect(getFailureMessage()).toHaveClass("hidden");
    });

    it("should redirect to /surveys", async () => {
      await waitForSuccessState();
      await waitFor(() => expect(screen.getByText(/surveys route/i)));
    });
  });

  describe("Invalid credentials failure", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      mockAction.mockReturnValue({ type: LoginResultType.InvalidCredentials });
      await goToSubmittingState(user);
    });

    it("should display an error message", async () => {
      await waitFor(() =>
        expect(getFailureMessage()).not.toHaveClass("hidden")
      );
    });

    it("should have an enabled email input", () => {
      expect(getEmailInput()).not.toBeDisabled();
    });

    it("should have an enabled password input", () => {
      expect(getPasswordInput()).not.toBeDisabled();
    });

    it("should have an enabled login button", () => {
      expect(getLoginButton()).not.toBeDisabled();
    });

    it("should have an enabled signup button", () => {
      expect(getSignupButton()).not.toBeDisabled();
    });
  });

  describe("Unexpected server error failure", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      mockAction.mockReturnValue({ type: LoginResultType.UnexpectedError });
      await goToSubmittingState(user);
    });

    it("should display an error message", async () => {
      await waitFor(() =>
        expect(getFailureMessage()).not.toHaveClass("hidden")
      );
    });

    it("should have an enabled email input", () => {
      expect(getEmailInput()).not.toBeDisabled();
    });

    it("should have an enabled password input", () => {
      expect(getPasswordInput()).not.toBeDisabled();
    });

    it("should have an enabled login button", () => {
      expect(getLoginButton()).not.toBeDisabled();
    });

    it("should have an enabled signup button", () => {
      expect(getSignupButton()).not.toBeDisabled();
    });
  });
});
