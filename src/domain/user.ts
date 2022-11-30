import { AggregateRoot } from "./aggregate-root";
import { UserCreatedEvent } from "./user-created-event";

export class User extends AggregateRoot {
  constructor(public name: string, public email: string, id?: string) {
    super(id);
    if (this.isNew) {
      this.addEvent(new UserCreatedEvent(this.id));
    }
  }
}
