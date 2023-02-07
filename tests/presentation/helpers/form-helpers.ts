import { faker } from "@faker-js/faker";
import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

export const getNameInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/name/i);

export const getEmailInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/email/i);

export const getPasswordInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/^password$/i);

export const getPasswordConfirmationInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/password confirmation/i);

export const getLoginButton = (): HTMLButtonElement =>
  screen.getByLabelText(/login/i);

export const getSignupButton = (): HTMLButtonElement =>
  screen.getByLabelText(/sign ?up/i);

export const getSpinner = (): HTMLSpanElement =>
  screen.getByLabelText("spinner");

export const getCheckmark = (): HTMLOrSVGElement =>
  screen.getByLabelText("checkmark");

export const getFailureMessage = (): HTMLDivElement =>
  screen.getByRole("alert");

export const fillEmailInput = async (
  user: UserEvent,
  value: string = faker.internet.email()
): Promise<void> => {
  const emailInput = getEmailInput();
  await user.clear(emailInput);
  await user.type(emailInput, value);
};
