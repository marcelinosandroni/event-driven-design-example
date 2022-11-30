import { UserDto } from "./mappers/user-mapper";

export interface UserQuery {
  page: number;
}

export interface UserRepository {
  getAll(query: UserQuery): Promise<UserDto[]>;
  save(user: UserDto): Promise<void>;
}
