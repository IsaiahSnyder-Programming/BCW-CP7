import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const todaysDate = mm + '/' + dd + '/' + yyyy;

export const TowerEventSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, required: true, min: 0 },
        startDate: { type: Date, required: true, min: new Date },
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