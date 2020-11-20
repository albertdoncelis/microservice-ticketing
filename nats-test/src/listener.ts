import nats, {Message, Stan} from 'node-nats-streaming'
import {randomBytes} from "crypto";

console.clear()
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('listener connected to NATS')
  stan.on('close', () => {
    console.log('NATS connection closed!')
    process.exit();
  })

  new TicketCreatedListener(stan).listen()
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())

abstract class Listener {
  abstract subject: string
  abstract queueGroupName: string
  protected actWait = 5 * 1000

  constructor(private readonly client: Stan) {}

  abstract onMessage(data: any, msg: Message): void

  subscriptionOptions() {
    // manual acknowledgement of the events
    // the default is false as soon the event received we will not received the event again.
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.actWait)
      .setDurableName(this.queueGroupName)
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message Received: ${this.subject} / ${this.queueGroupName}`
      )

      const parsedData = this.parseMessage(msg)

      this.onMessage(parsedData, msg)
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData()
    return typeof data === 'string'? JSON.parse(data): JSON.parse(data.toString('utf8'))
  }
}

class TicketCreatedListener extends Listener {
  queueGroupName: string = 'payments-service';
  subject: string = 'ticket:created';

  onMessage(data: any, msg: Message): void {
    console.log('Event data!', data)
    msg.ack()
  }
}