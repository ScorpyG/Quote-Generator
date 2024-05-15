import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useControlOptions() {
  const toast = useToast();
  const router = useRouter();

  // function to direct to dynamic page editQuote/[qid]
  const updateQueryParamToIncludeQuoteId = (qid: string) => {
    router.push({
      pathname: '/editQuote/[quoteId]',
      query: { quoteId: qid },
    });
  };

  const deleteQuote = useCallback(
    async (quoteId: string) => {
      try {
        const res = await axios.delete(`/api/quote/deleteQuote/${quoteId}`);

        if (res.status === 200) {
          toast({
            title: 'Quote deletion successful',
            description: 'The quote was successfully deleted',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Quote deletion failed',
          description: 'Unable to delete the quote',
          status: 'error',
          duration: 3500,
          isClosable: true,
        });
      }
    },
    [toast]
  );

  return {
    deleteQuote,
    updateQueryParamToIncludeQuoteId,
  };
}
