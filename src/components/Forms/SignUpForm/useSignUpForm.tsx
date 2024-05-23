import useAuth from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TRegister } from '../../../types/auth';

export default function useSignUpForm() {
  const toast = useToast();
  const { register } = useAuth();

  const onSubmit: SubmitHandler<TRegister> = useCallback(
    async (data: TRegister) => {
      try {
        const response = await register(data);

        if (response.status === 201) {
          toast({
            title: 'Registration successful',
            description: 'Your account was successfully created',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        } else if (response.status === 203) {
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
          description: 'Service is temporarily unavailable. Please try again later.',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    },
    [register, toast]
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
