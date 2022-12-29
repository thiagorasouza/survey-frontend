export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401,
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}
