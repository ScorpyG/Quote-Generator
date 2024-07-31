import { QuoteFormInput } from '@/components/Forms/AddQuoteForm/useAddQuoteForm';
import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import axios from 'axios';
import useSWR from 'swr';

export default function useQuote() {
  const useAllQuotes = (searchedTag: string) => {
    const endpoint = searchedTag ? `/api/quote/getAll?tag=${searchedTag}` : '/api/quote/getAll';
    const { data, error, isLoading } = useSWR<{ data: QuoteProps[] }>(endpoint);

    return {
      quotes: data?.data,
      isLoading,
      error,
    };
  };

  const useUserQuotes = () => {
    const { data, isLoading, error } = useSWR<{ data: QuoteProps[] }>(`/api/quote/userQuotes`);

    return {
      quotes: data?.data,
      isLoading,
      error,
    };
  };

  const createQuote = async (quote: QuoteFormInput) => {
    const response = await axios.post(
      '/api/quote/create',
      {
        ...quote,
        tags: quote.tags && quote.tags.length > 0 ? quote.tags.split(',').map((tag) => tag.trim()) : [],
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return {
        status: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  const editQuote = async (quoteId: string, quoteData: QuoteFormInput) => {
    const response = await axios.put(`/api/quote/edit/${quoteId}`, {
      ...quoteData,
      tags: quoteData.tags && quoteData.tags.length > 0 ? quoteData.tags.split(',').map((tag) => tag.trim()) : [],
    });

    if (response.status === 201) {
      return {
        status: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  const deleteQuote = async (quoteId: string) => {
    const response = await axios.delete(`/api/quote/delete/${quoteId}`);

    if (response.status === 202) {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  return { useAllQuotes, useUserQuotes, createQuote, editQuote, deleteQuote };
}
