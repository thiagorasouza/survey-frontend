import { faker } from "@faker-js/faker";
import { ActionFunctionArgs } from "react-router-dom";

export const mockActionArgs = (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): ActionFunctionArgs => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const url = `${faker.internet.url()}/login`;

  const request = new Request(url, {
    method: "POST",
    body: formData,
  });

  return { request, params: {} };
};
