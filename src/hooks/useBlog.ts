import axios from 'axios';
import useSWR from 'swr';

interface BlogFormData {
  title: string;
  contents: {
    block: string;
  }[];
  author: string;
  tags?: string;
  image?: string;
}

export default function useBlog() {
  const useAllBlogPost = async (searchedTag: string) => {
    const endpoint = searchedTag ? `/api/blog/getAll?tag=${searchedTag}` : '/api/blog/getAll';
    const { data, error, isLoading } = useSWR<{ data: BlogFormData[] }>(endpoint);

    return {
      posts: data?.data,
      isLoading,
      error,
    };
  };

  const useAllBlogPostOfAccount = async (userId: string) => {
    const { data, error, isLoading } = useSWR<{ data: BlogFormData[] }>(`/api/blog/getUserPosts/${userId}`);

    return {
      posts: data?.data,
      isLoading,
      error,
    };
  };

  const useBlogPostById = async (blogPostId: string) => {
    const { data, error, isLoading } = useSWR<{ data: BlogFormData }>(`/api/blog/get/${blogPostId}`);

    return {
      data: data?.data,
      isLoading,
      error,
    };
  };

  const createBlogPost = async (blogPost: BlogFormData) => {
    const response = await axios.post(
      '/api/blog/create',
      {
        ...blogPost,
        contents: blogPost.contents.map((content) => content.block),
        tags: blogPost.tags && blogPost.tags.length > 0 ? blogPost.tags.split(',').map((tag) => tag.trim()) : [],
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
    useAllBlogPostOfAccount,
    useBlogPostById,

    // Mutations
    createBlogPost,
    deleteBlogPostById,
    editBlogPost,
  };
}
