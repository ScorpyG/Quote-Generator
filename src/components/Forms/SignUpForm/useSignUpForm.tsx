import useAuth from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TRegister } from '../../../types/auth';

export default function useSignUpForm() {
  const toast = useToast();
  const { register } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<TRegister> = useCallback(
    async (data: TRegister) => {
      const response = await register(data);

      toast({
        title: response.status ? 'Registration successful' : 'Registration failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });

      if (response.status) {
        router.push('/signin');
      }
    },
    [register, router, toast]
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
