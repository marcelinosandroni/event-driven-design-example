import { WelcomeEmailSender } from "../../infrastructure/email-sender";
import { MemoryEmailTransport } from "../../infrastructure/memory-email-transport";

export class WelcomeEmailFactory {
  static create(): WelcomeEmailSender {
    const emailTransporter = new MemoryEmailTransport();
    return new WelcomeEmailSender(emailTransporter);
  }
}
