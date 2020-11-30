import { Listener, PaymentCreatedEvent, Subjects } from "@acelistickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order, OrderStatus } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  queueGroupName: string = queueGroupName;
  readonly subject: PaymentCreatedEvent["subject"] = Subjects.PaymentCreated;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.set({
      status: OrderStatus.Complete
    })

    await order.save()

    msg.ack()
  }
}