import useBlog from '@/hooks/useBlog';
import { BlogFormInput } from '@/types/blog';
import { useUploadThing } from '@/utils/uploadthing';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function useEditBlogForm() {
  const toast = useToast();
  const { editBlogPost } = useBlog();
  const query = useRouter();
  const blogPostId = query.query.postId as string;

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
    async (updatedPostData) => {
      if (updatedPostData.image && updatedPostData.image.length > 0) {
        const response = await startUpload([updatedPostData.image[0]]);

        /**
         * This implementation wait for the image to successfully uploaded onto Uploadthing service
         * and attach the image URL to the blog post data before sending it to the backend.
         */
        if (response && response.length > 0) {
          const imageUrl = response[0].url;
          const updatedPostDataWithImage = {
            ...updatedPostData,
            image: imageUrl,
          };

          const editBlogPostEndpointResponse = await editBlogPost(blogPostId, updatedPostDataWithImage);

          toast({
            title: editBlogPostEndpointResponse.status ? 'Successful' : 'Failed',
            description: editBlogPostEndpointResponse.message,
            status: editBlogPostEndpointResponse.status ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        const updatedPostDataWithoutImage = {
          ...updatedPostData,
          image: undefined,
        };

        const updateBlogEndpointResponse = await editBlogPost(blogPostId, updatedPostDataWithoutImage);

        toast({
          title: updateBlogEndpointResponse.status ? 'Successful' : 'Failed',
          description: updateBlogEndpointResponse.message,
          status: updateBlogEndpointResponse.status ? 'success' : 'error',
          duration: 3500,
          isClosable: true,
        });
      }
    },
    [blogPostId, editBlogPost, startUpload, toast]
  );

  const onInvalidSubmit = useCallback(() => {
    toast({
      title: 'Failed',
      description: 'Please fill out all the fields',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  }, [toast]);

  return {
    onSubmit,
    onInvalidSubmit,
  };
}
