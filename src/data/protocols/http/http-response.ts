export enum HttpStatusCode {
  badRequest = 400,
  noContent = 204,
  unauthorized = 401,
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}
