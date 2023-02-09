import { faker } from "@faker-js/faker";
import { ActionFunctionArgs } from "react-router-dom";

export const mockSignupActionArgs = (
  name: string = faker.name.fullName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): ActionFunctionArgs => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("passwordConfirmation", password);

  const url = `${faker.internet.url()}/signup`;

  const request = new Request(url, {
    method: "POST",
    body: formData,
  });

  return { request, params: {} };
};
