import { CreateUserCommandHandler } from "../application/commands/create-user-command-handler";
import { UserMemoryRepository } from "../persistence/user-memory-repository";
import { SignupController } from "../presentation/signup-controller";
import { CreateUserValidator } from "../presentation/validators/create-user-validator";

export const makeSignupController = (): SignupController => {
  const userRepository = new UserMemoryRepository();
  const signupUseCase = new CreateUserCommandHandler(userRepository);
  const createUserValidator = new CreateUserValidator();
  return new SignupController(signupUseCase, createUserValidator);
};
