import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, validateRequest} from "@acelistickets/common";
import {body} from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router()

router.post('/api/orders', requireAuth, [
  body('ticketId').not().isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body

  // Find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId)
  if (!ticket) {
    throw new NotFoundError()
  }
  // Make user that this ticket is not already reserved

  // Calculate an expire date from this order

  // Build the order and save it to the database

  // Publish an event saying that an order was created
  res.send({})
})

export { router as newOrderRouter }