import { EventEmitter } from "stream";
import { UserDto } from "../application/mappers/user-mapper";
import { UserQuery, UserRepository } from "../application/user-repository";
import { User } from "../domain/user";

const initialUsers = [
  new User("User 1", "any_mail_1"),
  new User("User 2", "any_mail_2"),
];

export class UserMemoryRepository implements UserRepository {
  private readonly users: User[] = initialUsers;
  static persistenceEvents = new EventEmitter();
  async getAll(query: UserQuery): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<void> {
    const savedUser = this.users.push(user);
    if (savedUser) {
      UserMemoryRepository.persistenceEvents.emit("UserSaved", user.id);
      return;
    }
    UserMemoryRepository.persistenceEvents.emit("ErrorSavingUser", user.id);
  }

  async getById(id: string): Promise<UserDto | void> {
    return this.users.find((user) => user.id === id);
  }
}
