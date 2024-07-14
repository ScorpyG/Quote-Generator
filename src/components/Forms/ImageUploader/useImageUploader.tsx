import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface ProfileImgFile {
  profileImage: File;
}

export default function useImageUploader() {
  const toast = useToast();

  const onSubmit = useCallback(async () => {}, []);

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Failed',
      description: 'Unable to upload image. Please try again later.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
