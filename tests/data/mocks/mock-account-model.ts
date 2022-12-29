import { faker } from "@faker-js/faker";
import { AccountModel } from "../../../src/domain/models/account-model";

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
