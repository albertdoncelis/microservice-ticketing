import {OrderCancelledEvent, Publisher, Subjects} from "@acelistickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}