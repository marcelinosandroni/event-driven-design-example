export interface Validation {
  validate(value: unknown): Error | void;
}
