export interface UseCase<Input = unknown, Output = unknown> {
  handle: (input: Input) => Promise<Output>;
}
