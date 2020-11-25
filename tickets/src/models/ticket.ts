import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
// An interface that describe that properties
// that required to create a new user
interface TicketAttr {
  title: string,
  price: number,
  userId: string
}

// An interface that describe that properties
// that a Ticket model has
interface TicketModel extends mongoose.Model<TickerDoc> {
  build(attrs: TicketAttr): TickerDoc
}

// An interface that describe the properties
// that a Ticket Document has
interface TickerDoc extends mongoose.Document {
  title: string
  price: number
  userId: string
  version: number
  orderId?: string
}


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttr) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TickerDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }