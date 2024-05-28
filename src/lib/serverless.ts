import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import Quote from '@/models/Quote';
import dbConnect from './dbConnect';

export async function getAllQuotes(): Promise<QuoteProps[]> {
  await dbConnect();
  const quotes = await Quote.find({});
  return quotes;
}

export async function getQuoteById(quoteId: string): Promise<QuoteProps> {
  await dbConnect();
  const quote = await Quote.findById(quoteId);

  return quote;
}
