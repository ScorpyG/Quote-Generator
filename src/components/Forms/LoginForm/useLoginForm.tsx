import useAuth from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TLogin } from '../../../types/auth';

export default function useLoginForm() {
  const toast = useToast();
  const { signIn } = useAuth();
  const router = useRouter();

  // TODO: Refactor this implementation
  const onSubmit: SubmitHandler<TLogin> = useCallback(
    async (data) => {
      const response = await signIn(data);

      toast({
        title: response.status ? 'Login successful' : 'Login failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });

      if (response.status) {
        router.push('/');
      }
    },
    [router, signIn, toast]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing credentials',
      description: 'Please enter the correct password and email',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
