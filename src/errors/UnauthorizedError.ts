import ApplicationError from "./ApplicationError";

export default class UnauthorizedError extends ApplicationError {
  constructor(message: string = "Authorization Failure") {
    super(message, "Unauthorized", 401);
  }
}
