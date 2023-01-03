import { faker } from "@faker-js/faker";

export const mockAxiosResponse = () => ({
  status: faker.datatype.number(),
  data: { any_key: "any_value" },
});
