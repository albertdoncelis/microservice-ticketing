import { Publisher, OrderCreatedEvent, Subjects } from '@acelistickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
