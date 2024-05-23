import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { fetcher } from '@/utils/swrFetcher';
import useSWR from 'swr';

export default function useQuote() {
  const useAllQuotes = () => {
    const { data, error, isLoading } = useSWR<QuoteProps[]>('/api/quote/getQuotes', fetcher);

    return {
      quotes: data,
      isLoading,
      error,
    };
  };

  const useQuoteById = (quoteId: string) => {
    const { data, error, isLoading } = useSWR<QuoteProps>(`/api/quote/getQuote/${quoteId}`, fetcher);

    return {
      quote: data,
      isLoading,
      error,
    };
  };

  const useUserQuotes = (userId: string) => {
    const { data, isLoading, error } = useSWR<QuoteProps[]>(`/api/quote/userQuotes/${userId}`, fetcher);

    return {
      quotes: data,
      isLoading,
      error,
    };
  };

  const useUpdateQuote = async () => {};

  return { useAllQuotes, useQuoteById, useUserQuotes, useUpdateQuote };
}
