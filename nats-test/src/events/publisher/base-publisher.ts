import {Stan} from 'node-nats-streaming'
import {Subjects} from "../subjects";

interface Event {
  readonly subject: Subjects
  data: any
}

export abstract class Publisher<T extends Event> {
  readonly abstract subject: T['subject']

  public constructor(private readonly client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err)
        }

        console.log('Event published.!', this.subject)
        resolve()
      })
    })

  }
}