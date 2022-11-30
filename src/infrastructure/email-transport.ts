export interface EmailContent {
  to: string;
  subject: string;
  body: string;
}

export interface EmailTransport {
  send(content: EmailContent): Promise<void>;
}
