import mongoose, { Document } from 'mongoose';

export interface TQuote extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  quote: string;
  author: string;
  tags?: string[];
}

const quoteSchema = new mongoose.Schema<TQuote>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema, 'quotes');
export default Quote;
