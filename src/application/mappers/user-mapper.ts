import { User } from "../../domain/user";

export interface UserDto {
  id: string;
  name: string;
  email: string;
}

// dto => domain
// domain => persistence
// domain => dto
// persistence => dto

export class UserMapper {
  static toDomain(rawUser: UserDto): User {
    return new User(rawUser.id, rawUser.name, rawUser.email);
  }

  static toDTOList(users: User[]): UserDto[] {
    return users.map((user) => UserMapper.toDTO(user));
  }

  static toDomainList(rawUsers: UserDto[]): User[] {
    return rawUsers.map((rawUser) => UserMapper.toDomain(rawUser));
  }

  static toPersistenceList(users: User[]): UserDto[] {
    return users.map((user) => UserMapper.toPersistence(user));
  }

  static toPersistence(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static toDTO(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
