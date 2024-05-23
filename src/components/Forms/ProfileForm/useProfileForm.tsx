import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface ProfileFormInput {
  firstName: string;
  lastName: string;
}

export default function useProfileForm() {
  const toast = useToast();

  const onSubmit: SubmitHandler<ProfileFormInput> = useCallback(
    async (data) => {
      try {
        // TODO: implement the API request to update user profile
        const res = await axios.put(
          '/api/auth/updateProfile',
          {
            data,
          },
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer'
            },
          }
        );

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
    [toast]
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
