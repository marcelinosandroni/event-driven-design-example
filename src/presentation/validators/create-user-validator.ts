import { Validation } from "../contracts/validation";

export class CreateUserValidator implements Validation {
  validate(value: unknown): Error | void {
    if (!value) {
      return new Error("Payload is required");
    }
    if (typeof value !== "object") {
      return new Error("Payload must be an object");
    }
    if (!("name" in value)) {
      return new Error("Name is required");
    }
    if (!("email" in value)) {
      return new Error("Email is required");
    }
  }
}
