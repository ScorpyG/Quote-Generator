import useQuote from '@/hooks/useQuote';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { QuoteFormInput } from '../AddQuoteForm/useAddQuoteForm';

export default function useEditQuoteForm() {
  const toast = useToast();
  const { query } = useRouter();
  const { editQuote } = useQuote();
  const quoteId = query.quoteId as string;

  const onSubmit: SubmitHandler<QuoteFormInput> = useCallback(
    async (quoteData) => {
      try {
        const res = await editQuote(quoteId, quoteData);

        if (res.status === 200) {
          toast({
            title: 'Quote update successful',
            description: 'Your quote has been updated',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Quote update failed',
            description: 'Unable to update your quote',
            status: 'error',
            duration: 3500,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Quote update failed',
          description: 'Unable to update your quote',
          status: 'error',
          duration: 3500,
          isClosable: true,
        });
      }
    },
    [editQuote, quoteId, toast]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing information',
      description: 'Please fill out all required fields',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
