export class APIError extends Error {
  code: number;
  details?: any;

  constructor(message: string, code: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = APIError.name;
    this.code = code;
  }

  public static example(): APIError {
    return new APIError('An unexpected error occurred. Please try again later.', 500);
  }
}

export class ResourceNotFoundError extends APIError {
  /**
   * Constructs a new ConfigError instance
   * @param message Optional error message
   */
  constructor(message = 'The requested resource was not found') {
    super(message, 404);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ResourceNotFoundError.name;
  }

  public static example(): ResourceNotFoundError {
    return new ResourceNotFoundError('The requested resource was not found');
  }
}

export class InvalidInputError extends APIError {
  /**
   * Constructs a new ConfigError instance
   * @param message Optional error message
   */
  constructor(message = 'The provided input is invalid') {
    super(message, 400);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidInputError.name;
  }
}

export class UnauthorizedError extends APIError {
  /**
   * Constructs a new ConfigError instance
   * @param message Optional error message
   */
  constructor(message = 'Requester is not authorized') {
    super(message, 404);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ResourceNotFoundError.name;
  }
}

export class AccessDeniedError extends APIError {
  /**
   * Constructs a new ConfigError instance
   * @param message Optional error message
   */
  constructor(message = 'Accessing the requested resource is not allowed') {
    super(message, 403);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ResourceNotFoundError.name;
  }
}
