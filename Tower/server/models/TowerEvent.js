import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TowerEventSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, required: true },
        startDate: { type: String, required: true },
        type: { type: String, required: true },
        isCanceled: { type: Boolean, required: true, default: false },
        creatorId: { type: ObjectId, ref: 'Profile', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})