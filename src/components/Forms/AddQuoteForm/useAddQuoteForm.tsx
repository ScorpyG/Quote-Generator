import useQuote from '@/hooks/useQuote';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSWRConfig } from 'swr';

export interface QuoteFormInput {
  quote: string;
  author: string;
  tags?: string;
}

export default function useAddQuoteForm() {
  const toast = useToast();
  const { createQuote } = useQuote();
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<QuoteFormInput> = useCallback(
    async (quoteData) => {
      const response = await createQuote(quoteData);
      mutate('/api/quote/userQuotes');

      toast({
        title: response.status ? 'Successful' : 'Failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });
    },
    [createQuote, mutate, toast]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing information',
      description: 'Please fill out the form',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
