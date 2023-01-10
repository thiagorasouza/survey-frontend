import { faker } from "@faker-js/faker";
import { AddAccountParams } from "../../../src/domain/usecases/add-account";

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
