import {PaymentCreatedEvent, Publisher, Subjects} from "@acelistickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: PaymentCreatedEvent["subject"] = Subjects.PaymentCreated;
}