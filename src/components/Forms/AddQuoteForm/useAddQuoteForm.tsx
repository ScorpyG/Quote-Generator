import useQuote from '@/hooks/useQuote';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface QuoteFormInput {
  quote: string;
  author: string;
  tags: string;
}

export default function useAddQuoteForm() {
  const toast = useToast();
  const { createQuote } = useQuote();

  const onSubmit: SubmitHandler<QuoteFormInput> = useCallback(
    async (quoteData) => {
      try {
        const res = await createQuote(quoteData);

        if (res.status === 201) {
          toast({
            title: 'Add Quote successful',
            description: 'Your quote is available for to the public',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Unable to add quote',
            status: 'error',
            description: 'Please try again later',
            duration: 3500,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong!',
          description: 'Service not available, please try again later.',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    },
    [toast, createQuote]
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
