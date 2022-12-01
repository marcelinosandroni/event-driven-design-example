import { randomUUID } from "crypto";

export abstract class DomainEvent {
  readonly dateTimeOccurred: Date = new Date();
  readonly eventId = randomUUID();

  constructor(
    readonly aggregateType: string,
    readonly aggregateId: string,
    readonly eventType: string,
    readonly data: unknown
  ) {}
}
