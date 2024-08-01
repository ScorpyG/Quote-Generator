import useBlog from '@/hooks/useBlog';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';

export default function useBlogContainer() {
  const { deleteBlogPostById } = useBlog();
  const toast = useToast();
  const router = useRouter();

  const deleteQuoteHandler = useCallback(
    async (postId: string) => {
      const response = await deleteBlogPostById(postId);
      mutate('/api/blog/userBlogPosts');

      toast({
        title: response.status ? 'Successful' : 'Failed',
        description: response.message,
        status: response.status ? 'success' : 'error',
        duration: 3500,
        isClosable: true,
      });
    },
    [deleteBlogPostById, toast]
  );

  // function to direct to dynamic page blog/[postId]
  const updateQueryParamToIncludePostId = (pid: string) => {
    router.push({
      pathname: '/blog/[postId]',
      query: { postId: pid },
    });
  };

  return {
    deleteQuoteHandler,
    updateQueryParamToIncludePostId,
  };
}
