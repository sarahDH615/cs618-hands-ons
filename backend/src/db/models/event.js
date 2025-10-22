import mongoose, { Schema } from 'mongoose'
// create schema
const eventSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true }, // id of the post
    session: { type: String, required: true },
    action: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }, // add timestamps to each entry
)
// create mongoose model from the schema
// arg 0: the singular of the name of the collection
// arg 2: schema to build the model from
// export to allow use anywhere in the project
export const Event = mongoose.model('event', eventSchema)
