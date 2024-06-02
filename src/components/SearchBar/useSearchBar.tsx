import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface TSearchBar {
  search: string;
}

export default function useSearchBar() {
  const toast = useToast();

  const onSubmit: SubmitHandler<TSearchBar> = useCallback(async (data: TSearchBar) => {
    // TODO: perform search action
    // eslint-disable-next-line no-console
    console.log(data);
  }, []);

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing search query',
      description: 'Please enter a search query',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
