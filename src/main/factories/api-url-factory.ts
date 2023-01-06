import { env } from "../config/env";

export const makeApiUrl = (path: string) => {
  return `${env.API_URL}${path}`;
};
