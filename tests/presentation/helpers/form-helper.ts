import { screen } from "@testing-library/react";

export const getNameInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/name/i);

export const getEmailInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/email/i);

export const getPasswordInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/^password$/i);

export const getPasswordConfirmationInput = (): HTMLInputElement =>
  screen.getByPlaceholderText(/password confirmation/i);

export const getSignupButton = (): HTMLButtonElement =>
  screen.getByRole("button", { name: /sign ?up/i });

export const getLoginButton = (): HTMLButtonElement =>
  screen.getByText(/login/i);
