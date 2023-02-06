export class InvalidParamsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParamsError";
  }
}
