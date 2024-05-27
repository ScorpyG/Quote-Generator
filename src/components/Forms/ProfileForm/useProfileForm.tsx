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
      try {
        const res = await updateProfile(data);

        if (res.status === 200) {
          toast({
            title: 'Profile update successful',
            description: 'Your profile information was successfully updated',
            status: 'success',
            duration: 3500,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Profile update failed',
            description: 'Unable to update your profile information',
            status: 'error',
            duration: 3500,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Profile update failed',
          description: 'Unable to update your profile information',
          status: 'error',
          duration: 3500,
          isClosable: true,
        });
      }
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
