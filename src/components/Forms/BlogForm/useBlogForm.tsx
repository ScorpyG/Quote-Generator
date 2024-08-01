import useBlog from '@/hooks/useBlog';
import { BlogFormInput } from '@/types/blog';
import { useUploadThing } from '@/utils/uploadthing';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function useBlogForm() {
  const toast = useToast();
  const { createBlogPost } = useBlog();

  const { startUpload } = useUploadThing('blogImage', {
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

  const onSubmit: SubmitHandler<BlogFormInput> = useCallback(
    async (postData: BlogFormInput) => {
      if (postData.image && postData.image.length > 0) {
        const response = await startUpload([postData.image[0]]);

        if (response && response.length > 0) {
          const imageUrl = response[0].url;
          const blogPostDataWithImage = {
            ...postData,
            image: imageUrl,
          };

          const createNewBlogPostEndpointResponse = await createBlogPost(blogPostDataWithImage);

          toast({
            title: createNewBlogPostEndpointResponse.status ? 'Successful' : 'Failed',
            description: createNewBlogPostEndpointResponse.message,
            status: createNewBlogPostEndpointResponse.status ? 'success' : 'error',
            duration: 3500,
            isClosable: true,
          });
        }
      } else {
        const blogPostDataWithoutImage = {
          ...postData,
          image: undefined,
        };
        const response = await createBlogPost(blogPostDataWithoutImage);

        toast({
          title: response.status ? 'Successful' : 'Failed',
          description: response.message,
          status: response.status ? 'success' : 'error',
          duration: 3500,
          isClosable: true,
        });
      }
    },
    [createBlogPost, startUpload, toast]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Missing information',
      description: 'Please fill out all required fields',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return { onSubmit, onInvalidSubmit };
}
