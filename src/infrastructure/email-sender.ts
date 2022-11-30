import { User } from "../domain/user";
import { EmailTransport } from "./email-transport";

export class WelcomeEmailSender {
  constructor(private readonly emailSender: EmailTransport) {}

  sendWelcomeEmail(user: User): void {
    console.log("sending welcome message");
    this.emailSender.send({
      to: user.email,
      subject: "Welcome to our platform!",
      body: `Welcome ${user.name}!`,
    });
  }
}
