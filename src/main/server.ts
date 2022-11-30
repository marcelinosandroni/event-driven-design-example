import express from "express";
import { UserMapper } from "../application/mappers/user-mapper";
import { CoreDomainEvents } from "../domain/core-domain-events";
import { UserCreatedEvent } from "../domain/user-created-event";
import { WelcomeEmailSender } from "../infrastructure/email-sender";
import { MemoryEmailTransport } from "../infrastructure/memory-email-transport";
import { UserMemoryRepository } from "../persistence/user-memory-repository";
import { expressRouterAdapter } from "./express-router-adapter";
import { makeListUserController } from "./list-user-controller-factory";
import { makeSignupController } from "./signup-controller-factory";

const app = express();
app.use(express.json());
app.get("/", (request, response) => response.send("I'm working!"));
app.get("/users", expressRouterAdapter(makeListUserController()));
app.post("/users", expressRouterAdapter(makeSignupController()));
app.listen(3000, () => console.log("I'm ready to work dude!"));

// Emit o domain event apos confirmar a persistencia, @TODO criar um UNIT OF WORK
// colocando aqui no arquivo principal pq to com preguicinha
UserMemoryRepository.persistenceEvents.addListener("UserSaved", (userId) => {
  console.log("User saved with id: ", userId);
  CoreDomainEvents.dispatchAggregate(userId);
});

// Remove all related events qhen a error occurs on persistence
UserMemoryRepository.persistenceEvents.addListener(
  "ErrorSavingUser",
  (userId: string) => {
    console.log("Error saving user with id: ", userId);
    CoreDomainEvents.clearAggregate(userId);
  }
);

// Register all domain events
console.log(`Class Event Name: ${UserCreatedEvent.name}`);
CoreDomainEvents.register(UserCreatedEvent.name, (userEvent: unknown) => {
  // welcome email sender facotry
  const emailTransporter = new MemoryEmailTransport();
  const welcomeEmailSender = new WelcomeEmailSender(emailTransporter);
  const userMemoryRepository = new UserMemoryRepository();

  // usercreatedeventhandler interface
  // AfterUserCreatedEventHandler
  // UserCreatedEventHandler

  // Wait 10 seconds to query user and send meail
  console.log("Received event but waiting a bit to send email", userEvent);
  if (!(userEvent instanceof UserCreatedEvent)) {
    console.log("received event is not a user event", userEvent);
    return;
  }
  setTimeout(async () => {
    const user = await userMemoryRepository.getById(userEvent.userId);
    if (user) {
      welcomeEmailSender.sendWelcomeEmail(UserMapper.toDomain(user));
      return;
    }
    console.log("User not found, something terrible happened");
  }, 10_000);
});
