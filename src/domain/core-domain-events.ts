import { EventEmitter } from "stream";
import { AggregateRoot } from "./aggregate-root";

export class CoreDomainEvents {
  private static events = new EventEmitter();
  private static aggregates: AggregateRoot[] = [];

  public static addAggregate(aggregate: AggregateRoot): void {
    this.aggregates.push(aggregate);
  }

  public static clearAggregate(aggregateId: string): void {
    const aggregate = this.aggregates.find(
      (aggregate) => aggregate.id === aggregateId
    );

    if (aggregate) {
      aggregate.clearEvents();
    }
  }

  public static dispatchAggregate(aggregateId: string): void {
    const aggregate = this.aggregates.find(
      (aggregate) => aggregate.id === aggregateId
    );

    if (aggregate) {
      aggregate.getEvents().forEach((event) => {
        CoreDomainEvents.events.emit(event.eventType, event);
      });
      console.log("dispatchAggregate", aggregateId);
    }
  }

  public static register(
    eventName: string,
    subscriber: (data: unknown) => void
  ): void {
    CoreDomainEvents.events.addListener(eventName, subscriber);
  }

  public static registerAll(
    eventNames: string[],
    subscriber: (data: unknown) => void
  ): void {
    eventNames.forEach((eventName) => {
      CoreDomainEvents.register(eventName, subscriber);
    });
  }

  public static clearHandlers(eventName: string): void {
    CoreDomainEvents.events.removeAllListeners(eventName);
  }
}
