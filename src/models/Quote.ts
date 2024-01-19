import mongoose, { Schema } from 'mongoose';

const quoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model('User', quoteSchema);
