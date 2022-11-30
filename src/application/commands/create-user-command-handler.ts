import { CreateUserCommand } from "./create-user-command";

import { User } from "../../domain/user";

import { UseCase } from "../contracts/usecase";
import { UserDto, UserMapper } from "../mappers/user-mapper";
import { UserRepository } from "../user-repository";

export class CreateUserCommandHandler
  implements UseCase<CreateUserCommand, UserDto>
{
  constructor(private readonly userRepository: UserRepository) {}

  // A command never fetch data, only create or update it
  async handle(command: CreateUserCommand): Promise<UserDto> {
    const user = new User(command.name, command.email);
    const userModel = UserMapper.toPersistence(user);
    await this.userRepository.save(userModel);
    return UserMapper.toDTO(user);
  }
}
