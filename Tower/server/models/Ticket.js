import mongoose from "mongoose";
const Schema = mongoose.Schema


export const TicketSchema = new Schema(
    {
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('TowerEvent', {
    localField: 'towerEventId',
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