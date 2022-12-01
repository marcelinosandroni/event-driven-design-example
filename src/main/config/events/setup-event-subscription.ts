import { CoreDomainEvents } from "../../../domain/core-domain-events";
import { UserCreatedEvent } from "../../../domain/user-created-event";
import { UserMemoryRepository } from "../../../persistence/user-memory-repository";
import { WelcomeEmailFactory } from "../../factories/welcome-email-factory";
import { SendWelcomeEmailAfterUserCreated } from "./send-welcome-email-after-user-created";

export const setupEventSubscription = () => {
  const sendWelcomeEmail = WelcomeEmailFactory.create();
  const userRepository = new UserMemoryRepository();

  const sendWelcomeEmailAfterUserCreated = new SendWelcomeEmailAfterUserCreated(
    sendWelcomeEmail,
    userRepository
  );
  CoreDomainEvents.register(UserCreatedEvent.name, (event: UserCreatedEvent) =>
    sendWelcomeEmailAfterUserCreated.handle(event)
  );
};
