/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";

import { queryByRole, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

import LoginPage from "../../../src/presentation/pages/LoginPage";

import { enableFetchMocks } from "jest-fetch-mock";
import {
  fillEmailInput,
  fillPasswordInput,
  getCheckmark,
  getEmailInput,
  getFailureMessage,
  getLoginButton,
  getPasswordInput,
  getSignupButton,
  getSpinner,
  queryFailureMessage,
} from "../helpers/form-helpers";
import { mockRouter } from "../mocks/mock-router";
import { InvalidCredentialsError } from "../../../src/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { mockLoginAction } from "../mocks/mock-login-action";
import { ActionHandler } from "../../../src/presentation/action/ActionHandler";
enableFetchMocks();

interface SutTypes {
  sut: ReactElement;
  user: UserEvent;
  loginActionStub: ActionHandler;
}

const fillLoginForm = async (user: UserEvent): Promise<void> => {
  await fillEmailInput(user, "valid@email.com");
  await fillPasswordInput(user, "12345678a");
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
  const loginActionStub = mockLoginAction();
  const sut = mockRouter(<LoginPage />, loginActionStub);
  const user = userEvent.setup();
  return { sut, user, loginActionStub };
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
      expect(queryFailureMessage()).not.toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("should indicate that email is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getEmailInput());
      await clickLoginButton(user);
      expect(getEmailInput()).toBeInvalid();
    });

    it("should indicate that password is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getPasswordInput());
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
      expect(queryFailureMessage()).not.toBeInTheDocument();
    });
  });

  describe("Invalid credentials failure", () => {
    beforeEach(async () => {
      const { sut, user, loginActionStub } = makeSut();
      jest.spyOn(loginActionStub, "handle").mockResolvedValue({
        status: "error",
        error: new InvalidCredentialsError(),
      });

      render(sut);
      await goToSubmittingState(user);
    });

    it("should display an error message", async () => {
      await waitFor(() => expect(getFailureMessage()).toBeVisible());
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
      const { sut, user, loginActionStub } = makeSut();
      jest.spyOn(loginActionStub, "handle").mockResolvedValue({
        status: "error",
        error: new UnexpectedError(),
      });

      render(sut);
      await goToSubmittingState(user);
    });

    it("should display an error message", async () => {
      await waitFor(() => expect(getFailureMessage()).toBeVisible());
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

    it("should redirect to /surveys", async () => {
      await waitForSuccessState();
      await waitFor(() => expect(screen.getByText(/surveys route/i)));
    });

    it("should not display an error message", async () => {
      await waitForSuccessState();
      expect(queryFailureMessage()).not.toBeInTheDocument();
    });
  });
});
