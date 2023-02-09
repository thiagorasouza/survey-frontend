/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";

import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { render, waitFor } from "@testing-library/react";
import { enableFetchMocks } from "jest-fetch-mock";
import "@testing-library/jest-dom";

import SignupPage from "../../../src/presentation/pages/SignupPage";
import {
  fillEmailInput,
  fillNameInput,
  fillPasswordConfirmationInput,
  fillPasswordInput,
  getEmailInput,
  getFailureMessage,
  getLoginButton,
  getNameInput,
  getPasswordConfirmationInput,
  getPasswordInput,
  getSignupButton,
  getSpinner,
} from "../helpers/form-helpers";
import { mockRouter } from "../mocks/mock-router";
import { faker } from "@faker-js/faker";
import { SignupResultType } from "../../../src/presentation/action/SignupResult";
import { EmailInUseError } from "../../../src/domain/errors/email-in-use-error";

enableFetchMocks();

const clickSignupButton = async (user: UserEvent): Promise<void> => {
  const signupButton = getSignupButton();
  await user.click(signupButton);
};

const fillSignupForm = async (user: UserEvent): Promise<void> => {
  await fillNameInput(user);
  await fillEmailInput(user);
  const fakePassword = faker.internet.password();
  await fillPasswordInput(user, fakePassword);
  await fillPasswordConfirmationInput(user, fakePassword);
};

const goToSubmittingState = async (user: UserEvent): Promise<void> => {
  await fillSignupForm(user);
  await clickSignupButton(user);
};

interface SutTypes {
  sut: ReactElement;
  user: UserEvent;
}

const signupActionStub = jest.fn(async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { type: SignupResultType.Success };
});

const makeSut = (): SutTypes => {
  const sut = mockRouter(<SignupPage />, signupActionStub);
  const user = userEvent.setup();
  return { sut, user };
};

describe("Signup Page Test Suite", () => {
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

  describe("Validation", () => {
    it("should indicate that name is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getNameInput());
      await clickSignupButton(user);
      expect(getNameInput()).toBeInvalid();
    });

    it("should indicate that email is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getEmailInput());
      await clickSignupButton(user);
      expect(getEmailInput()).toBeInvalid();
    });

    it("should indicate that password is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getPasswordInput());
      await clickSignupButton(user);
      expect(getPasswordInput()).toBeInvalid();
    });

    it("should indicate that password confirmation is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await user.clear(getPasswordConfirmationInput());
      await clickSignupButton(user);
      expect(getPasswordConfirmationInput()).toBeInvalid();
    });

    it("should indicate if email is invalid", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await fillEmailInput(user, "invalid_email");
      await clickSignupButton(user);
      expect(getEmailInput()).toBeInvalid();
    });

    it("should indicate if passwords don't match", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await fillPasswordInput(user, "one_password");
      await fillPasswordConfirmationInput(user, "other_password");
      await clickSignupButton(user);
      expect(getPasswordInput()).toBeInvalid();
      expect(getPasswordConfirmationInput()).toBeInvalid();
    });
  });

  describe("Submitting state", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      await goToSubmittingState(user);
    });

    it("should disable name input", async () => {
      await waitFor(() => expect(getNameInput()).toBeDisabled());
    });

    it("should disable email input", async () => {
      await waitFor(() => expect(getEmailInput()).toBeDisabled());
    });

    it("should disable password input", async () => {
      await waitFor(() => expect(getPasswordInput()).toBeDisabled());
    });

    it("should disable password confirmation input", async () => {
      await waitFor(() =>
        expect(getPasswordConfirmationInput()).toBeDisabled()
      );
    });

    it("should disable signup button", async () => {
      await waitFor(() => expect(getSignupButton()).toBeDisabled());
    });

    it("should display a loading spinner", async () => {
      await waitFor(() => expect(getSpinner()));
    });

    it("should hide login button", async () => {
      await waitFor(() => expect(getLoginButton()).not.toBeVisible());
    });

    it("should not display an error message", async () => {
      await waitFor(() => expect(getFailureMessage()).toHaveClass("hidden"));
    });
  });

  describe("Email in use failure", () => {
    beforeEach(async () => {
      const { sut, user } = makeSut();
      render(sut);
      signupActionStub.mockReturnValue(
        Promise.resolve({
          type: SignupResultType.EmailInUseError,
          data: new EmailInUseError().message,
        })
      );
      await goToSubmittingState(user);
    });

    it("should display an error message", async () => {
      await waitFor(() => {
        const failureMessage = getFailureMessage();
        // expect(failureMessage).not.toHaveClass("hidden");
        expect(failureMessage).toHaveTextContent("Email already in use");
      });
    });
  });
});
