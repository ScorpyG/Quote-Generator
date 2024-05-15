import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { QuoteFormInput } from '../AddQuoteForm/useAddQuoteForm';

export default function useEditQuoteForm() {
  const toast = useToast();

  const onSubmit: SubmitHandler<QuoteFormInput> = useCallback(
    async (data) => {
      // TODO: use SWR to handle the quote update
      // eslint-disable-next-line no-console
      console.log(data);

      toast({
        title: 'Update Successful',
        description: 'Your quote has been updated',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    },
    [toast]
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
