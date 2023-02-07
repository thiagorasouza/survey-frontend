/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from "react";

import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import SignupPage from "../../../src/presentation/pages/SignupPage";
import {
  getEmailInput,
  getLoginButton,
  getNameInput,
  getPasswordConfirmationInput,
  getPasswordInput,
  getSignupButton,
} from "../helpers/form-helpers";
import { mockRouter } from "../mocks/mock-router";

const clickSignupButton = async (user: UserEvent): Promise<void> => {
  const signupButton = getSignupButton();
  await user.click(signupButton);
};

interface SutTypes {
  sut: ReactElement;
  user: UserEvent;
}

const makeSut = (): SutTypes => {
  const sut = mockRouter(<SignupPage />);
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
      await clickSignupButton(user);
      expect(getNameInput()).toBeInvalid();
    });

    it("should indicate that email is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await clickSignupButton(user);
      expect(getEmailInput()).toBeInvalid();
    });

    it("should indicate that password is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await clickSignupButton(user);
      expect(getPasswordInput()).toBeInvalid();
    });

    it("should indicate that password confirmation is invalid if empty", async () => {
      const { sut, user } = makeSut();
      render(sut);
      await clickSignupButton(user);
      expect(getPasswordConfirmationInput()).toBeInvalid();
    });
  });
});
