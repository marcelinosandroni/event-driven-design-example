import { UserMapper } from "../../../application/mappers/user-mapper";
import { UserRepository } from "../../../application/user-repository";
import { UserCreatedEvent } from "../../../domain/user-created-event";
import { WelcomeEmailSender } from "../../../infrastructure/email-sender";

export class SendWelcomeEmailAfterUserCreated {
  private readonly delayToSendEmailInMilliseconds = 10_000;
  constructor(
    private readonly useCase: WelcomeEmailSender,
    private readonly userRepository: UserRepository
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    if (!(event instanceof UserCreatedEvent)) {
      console.log("received event is not a user event", event);
      return;
    }

    // send email after a short delay
    setTimeout(async () => {
      const user = await this.userRepository.getById(event.userId);
      if (user) {
        this.useCase.sendWelcomeEmail(UserMapper.toDomain(user));
        return;
      }
      console.log("User not found, something TERRIBLE happened");
    }, this.delayToSendEmailInMilliseconds);
  }
}
