import mongoose from "mongoose";
const Schema = mongoose.Schema


export const TicketSchema = new Schema(
    {
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        // amount: { type: Number, required: true, min: 1 }

    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })


TicketSchema.virtual('TowerEvent', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'TowerEvent'
  })

TicketSchema.virtual('EventGoer', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
  })