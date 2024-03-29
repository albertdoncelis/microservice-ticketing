import { Listener, OrderCancelledEvent, Subjects } from "@acelistickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  queueGroupName: string = queueGroupName;
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)

    if ( !ticket ) {
      throw new Error('Ticket not found')
    }

    ticket.set({ orderId: undefined })
    await ticket.save()

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id || '',
      orderId: ticket.orderId || '',
      userId: ticket.userId || '',
      price: ticket.price || 0,
      title: ticket.title || '',
      version: ticket.version || 0
    })

    msg.ack()
  }
}