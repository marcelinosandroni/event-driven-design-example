import { EmailContent } from "./email-transport";

import { EmailTransport } from "./email-transport";

export class MemoryEmailTransport implements EmailTransport {
  async send(content: EmailContent): Promise<void> {
    console.log({ content });
  }
}
