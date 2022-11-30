import { randomUUID } from "node:crypto";
import { CoreDomainEvents } from "./core-domain-events";
import { DomainEvent } from "./domain-event";

export abstract class AggregateRoot {
  private readonly _id: string;
  private readonly events: DomainEvent[] = [];
  protected isNew = false;

  public get id(): string {
    return this._id;
  }

  constructor(id?: string) {
    if (!id) {
      this.isNew = true;
    }
    this._id = id || randomUUID();
  }

  public getEvents(): DomainEvent[] {
    return this.events;
  }

  public clearEvents(): void {
    this.events.slice(0, this.events.length);
    console.log("[${this.constructor.name}]: Events cleared");
  }

  protected addEvent(event: DomainEvent): void {
    this.events.push(event);
    this.logEvent(event);
    CoreDomainEvents.addAggregate(this);
  }

  private logEvent(event: DomainEvent): void {
    console.log(
      `[${this.constructor.name}]: Event ${event.constructor.name} recorded`
    );
  }
}
