import nats, {Message} from 'node-nats-streaming'
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
  // manual acknowledgement of the events
  // the default is false as soon the event received we will not received the event again.
  const options = stan.subscriptionOptions()
    .setManualAckMode(true)
  const subscription = stan.subscribe('ticket:created', 'ticketingListener', options)

  subscription.on('message', (msg: Message) => {
    console.log('message received!')
    const data = msg.getData()
    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())