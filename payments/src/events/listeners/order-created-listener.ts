import {Listener, OrderCreatedEvent, Subjects} from "@acelistickets/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Order} from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName: string = queueGroupName;
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id || '',
      price: data.ticket.price || 0,
      status: data.status || '',
      userId: data.userId || '',
      version: data.version || 0
    })

    await order.save()

    msg.ack()
  }
}