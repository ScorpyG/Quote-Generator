import { useToast } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface LoginFormInput {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const toast = useToast();

  // TODO: Refactor this implementation
  const onSubmit: SubmitHandler<LoginFormInput> = useCallback(
    async (data) => {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast({
          title: 'Login failed',
          description: 'Please enter the correct email and password',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3500,
          isClosable: true,
        });
      }
    },
    [toast]
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
