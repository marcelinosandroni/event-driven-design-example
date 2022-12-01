import { AggregateRoot } from "./aggregate-root";
import { DomainError } from "./errors/domain-error";
import { UserCreatedEvent } from "./user-created-event";

interface UserProperties {
  name: string;
  email: string;
}

export class User extends AggregateRoot {
  get name(): string {
    return this.properties.name;
  }

  get email(): string {
    return this.properties.email;
  }

  private constructor(private properties: UserProperties, id?: string) {
    super(id);
    if (this.isNew) {
      this.addEvent(new UserCreatedEvent(this.id));
    }
  }

  static crete(properties: UserProperties, id?: string): User {
    if (properties.name.split(" ").length < 2) {
      return DomainError.user.nameTooShort;
    }

    return new User(properties, id);
  }
}
