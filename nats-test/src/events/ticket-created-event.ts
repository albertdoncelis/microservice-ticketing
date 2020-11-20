import {Subjects} from "./subjects";

export interface TicketCreatedEvent {
  readonly subject: Subjects.TicketCreated

  readonly data: {
    id: string,
    title: string,
    price: number
  }
}