export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static conflict(message: string) {
    return new HttpError(409, message);
  }

  static notFound(message: string) {
    return new HttpError(404, message);
  }

  static forbidden(message: string) {
    return new HttpError(403, message);
  }

  static unauthorized(message: string) {
    return new HttpError(401, message);
  }

  static badRequest(message: string) {
    return new HttpError(400, message);
  }

  static internal(message: string) {
    return new HttpError(500, message);
  }
}
