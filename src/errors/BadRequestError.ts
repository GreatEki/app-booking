import ApplicationError from "./ApplicationError";

export default class BadRequestError extends ApplicationError {
  constructor(message: string = "Bad Request Error") {
    super(message, "Bad Request", 401);
  }
}
