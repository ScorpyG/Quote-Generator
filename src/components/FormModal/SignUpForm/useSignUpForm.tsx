import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface SignUpFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function useSignUpForm() {
  const toast = useToast();

  const onSubmit: SubmitHandler<SignUpFormInput> = useCallback(
    async (data) => {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // TODO: refactor this implementation
        if (res.status === 201) {
          toast({
            title: 'Registration successful',
            description: 'Your account was successfully created',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        } else if (res.status === 400) {
          toast({
            title: 'Registration failed',
            description: 'Email is already in use',
            status: 'warning',
            duration: 3500,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Registration failed',
            description: 'Unable to register your account please try again later',
            status: 'error',
            duration: 6000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Registration failed',
          description: 'Unable to register your account please try again later',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    },
    [toast]
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
