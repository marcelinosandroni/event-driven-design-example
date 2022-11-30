import { UserRepository } from "../user-repository";
import { ListUserQuery } from "./list-user-query";
import { UserDto, UserMapper } from "../mappers/user-mapper";
import { UseCase } from "../contracts/usecase";

export class ListUserQueryHandler implements UseCase<ListUserQuery, UserDto[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(query: ListUserQuery): Promise<UserDto[]> {
    const userModels = await this.userRepository.getAll(query);
    const users = UserMapper.toDomainList(userModels);
    return UserMapper.toDTOList(users);
  }
}
