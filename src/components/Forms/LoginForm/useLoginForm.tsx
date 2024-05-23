import useAuth from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TLogin } from '../../../types/auth';

export default function useLoginForm() {
  const toast = useToast();
  const router = useRouter();
  const { signIn } = useAuth();

  // TODO: Refactor this implementation
  const onSubmit: SubmitHandler<TLogin> = useCallback(
    async (data) => {
      try {
        const response = await signIn(data);

        if (response?.status === 200) {
          toast({
            title: 'Login successful',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
          router.push('/');
        } else {
          toast({
            title: 'Login failed',
            description: 'Please enter the correct email and password',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Login failed',
          description: `${error}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
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
