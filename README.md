# Event Driven Design Example

This a tiny application with examples of a architecture using event driven
design and domain driven design


## Architecture Layers

* Domain
* Application
* Presentation
* Persistence
* Infrastructure
* Main - Dirt Layer


## Events

This application has focus on domain events for signative use cases

All use cases is divided with CQRS, for queries and commands

## Unit of Work

Currently domain events dispath wait final operations from persistence layers,
without a unit of work, the better aproach is to implement this aggregation of
operation together to dispatch correct the success for domain events, with less
or none coupling
