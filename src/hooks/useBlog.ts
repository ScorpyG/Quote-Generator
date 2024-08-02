import { BlogData, BlogFormInputData } from '@/types/blog';
import axios from 'axios';
import useSWR from 'swr';

export default function useBlog() {
  const useAllBlogPost = (searchedTag: string) => {
    const endpoint = searchedTag ? `/api/blog/getAll?tag=${searchedTag}` : '/api/blog/getAll';
    const { data, error, isLoading } = useSWR<{ data: BlogData[] }>(endpoint);

    return {
      posts: data?.data,
      isLoading,
      error,
    };
  };

  const useAccountBlogsPage = (username: string) => {
    const { data, error, isLoading } = useSWR<{ data: BlogData[] }>(`/api/blog/getByUsername/${username}`);

    return {
      posts: data?.data,
      isLoading,
      error,
    };
  };

  const useAccountBlogsProfilePage = () => {
    const { data, error, isLoading } = useSWR<{ data: BlogData[] }>('/api/blog/userPosts');

    return {
      posts: data?.data,
      isLoading,
      error,
    };
  };

  const useBlogPostById = (blogPostId: string) => {
    const { data, error, isLoading } = useSWR<{ data: BlogData }>(`/api/blog/get/${blogPostId}`);

    return {
      data: data?.data,
      isLoading,
      error,
    };
  };

  const createBlogPost = async (blogPost: BlogFormInputData) => {
    const response = await axios.post(
      '/api/blog/create',
      {
        ...blogPost,
        contents: blogPost.contents.map((content) => content.block),
        tags: blogPost.tags ? blogPost.tags.split(',').map((tag) => tag.trim()) : [],
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return {
        status: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  const deleteBlogPostById = async (blogPostId: string) => {
    const response = await axios.delete(`/api/blog/delete/${blogPostId}`);

    return {
      status: response.data.success,
      message: response.data.message,
    };
  };

  // TODO: implement this function
  const editBlogPost = async (blogPostId: string) => {
    // eslint-disable-next-line no-console
    console.log(blogPostId);
  };

  return {
    // Query
    useAllBlogPost,
    useAccountBlogsPage,
    useAccountBlogsProfilePage,
    useBlogPostById,

    // Mutations
    createBlogPost,
    deleteBlogPostById,
    editBlogPost,
  };
}
