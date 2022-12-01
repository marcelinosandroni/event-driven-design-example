export class Result<Type> {
  readonly isSuccess = !!this.value;
  readonly isFailure = !this.isSuccess;

  private constructor(
    readonly value: Type | null,
    readonly error: Error | null
  ) {}

  static from<Type>(value: Type): Result<Type> {
    if (!value && Number(value) !== 0) {
      return Result.failure<Type>(new Error("Value is null or undefined"));
    }
    return Result.success<Type>(value);
  }

  static success<Type>(value: Type): Result<Type> {
    return new Result<Type>(value, null);
  }

  static failure<Type>(error: Error): Result<Type> {
    return new Result<Type>(null, error);
  }
}
