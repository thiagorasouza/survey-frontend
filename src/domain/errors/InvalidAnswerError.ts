export class InvalidAnswerError extends Error {
  constructor() {
    super("Invalid answer.");
    this.name = "InvalidAnswerError";
  }
}
