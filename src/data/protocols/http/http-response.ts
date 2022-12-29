export enum HttpStatusCode {
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}
