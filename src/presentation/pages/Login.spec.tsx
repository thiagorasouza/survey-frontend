/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

describe("Login Page Test Suite", () => {
  it("should have an enabled email input", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).not.toBeDisabled();
  });

  it("should have an enabled password input", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/password/i)).not.toBeDisabled();
  });

  it("should have an enabled login button", () => {
    render(<Login />);
    expect(screen.getByText(/login/i)).not.toBeDisabled();
  });

  it("should have an enabled signup button", () => {
    render(<Login />);
    expect(screen.getByText(/sign ?up/i)).not.toBeDisabled();
  });
});
