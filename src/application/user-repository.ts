import { UserDto } from "./mappers/user-mapper";

export interface UserQuery {
  page: number;
}

export interface UserRepository {
  getAll(query: UserQuery): Promise<UserDto[]>;
  getById(id: string): Promise<UserDto | void>;
  getByEmail(email: string): Promise<UserDto | void>;
  save(user: UserDto): Promise<void>;
}
