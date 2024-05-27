import useAuth from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface ProfileFormInput {
  firstName: string;
  lastName: string;
}

export default function useProfileForm() {
  const toast = useToast();
  const { updateProfile } = useAuth();

  const onSubmit: SubmitHandler<ProfileFormInput> = useCallback(
    async (data) => {
      const response = await updateProfile(data);

      toast({
        title: response.status ? 'Profile update successful' : 'Profile update failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });
    },
    [toast, updateProfile]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing information',
      description: 'Please update your profile information',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
