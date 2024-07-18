import { useUploadThing } from '@/utils/uploadthing';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface ProfileImgFile {
  /**
   * We specify FileList type here to match with the type of the file input element from the form
   *
   * FileList type ≠ [File] type and cannot be cast or specified as [File] type
   *
   * When passing FileList type in to File (TypeScript doesn't complain)
   * Resulted in parsing issue with UploadThing's server
   */
  file: FileList;
}

export default function useImageUploader() {
  const toast = useToast();

  const { startUpload } = useUploadThing('profileImage', {
    onClientUploadComplete(res) {
      if (res[0].serverData.success) {
        toast({
          title: 'Success',
          description: 'Image uploaded successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Failed',
          description: `${res[0].serverData.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    onUploadError(error: Error) {
      toast({
        title: 'Failed',
        description: `${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<ProfileImgFile> = useCallback(
    async ({ file }: ProfileImgFile) => {
      if (!file) {
        toast({
          title: 'Failed',
          description: 'No file selected.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      // From here we access FileList by index 0
      // as we only accepted 1 File then put into an array
      // to match with the argument type of startUpload method
      await startUpload([file[0]]);
    },
    [startUpload, toast]
  );

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
