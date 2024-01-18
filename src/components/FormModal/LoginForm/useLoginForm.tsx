import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface LoginFormInput {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const toast = useToast();

  // TODO: handle the login request
  const onSubmit: SubmitHandler<LoginFormInput> = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, []);

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
