import ApplicationError from "./ApplicationError";

export default class NotFoundError extends ApplicationError {
  constructor(message: string = "Not Found Error") {
    super(message, "Not Found", 404);
  }
}
