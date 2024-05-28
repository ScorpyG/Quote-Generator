import useQuote from '@/hooks/useQuote';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useControlOptions() {
  const toast = useToast();
  const router = useRouter();
  const { deleteQuote } = useQuote();

  // function to direct to dynamic page editQuote/[qid]
  const updateQueryParamToIncludeQuoteId = (qid: string) => {
    router.push({
      pathname: '/editQuote/[quoteId]',
      query: { quoteId: qid },
    });
  };

  const deleteQuoteHandler = useCallback(
    async (quoteId: string) => {
      const response = await deleteQuote(quoteId);

      toast({
        title: response.status ? 'Successful' : 'Failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });
    },
    [toast, deleteQuote]
  );

  return {
    deleteQuoteHandler,
    updateQueryParamToIncludeQuoteId,
  };
}
