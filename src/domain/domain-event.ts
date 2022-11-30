export abstract class DomainEvent {
  public dateTimeOccurred: Date = new Date();
  constructor(public readonly name: string) {}
}
