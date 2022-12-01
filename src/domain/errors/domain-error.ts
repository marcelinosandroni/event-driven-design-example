export class DomainError extends Error {
  constructor(message: string) {
    super(message);
  }

  static user = {
    nameTooShort: new DomainError("User name must have two or more words"),
  };
}
