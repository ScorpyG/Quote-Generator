import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface TSearchBar {
  searchQuery: string;
}

export default function useSearchBar() {
  const toast = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<TSearchBar> = useCallback(
    async ({ searchQuery }: TSearchBar) => {
      router.push({
        pathname: '/',
        query: { tag: searchQuery },
      });
    },
    [router]
  );

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
