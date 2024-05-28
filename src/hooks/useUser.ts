import { fetcher } from '@/lib/swrFetcher';
import { AuthUser } from '@/types/auth';
import useSWR from 'swr';

export default function useUser() {
  const useAuthUser = () => {
    const { data, error, isLoading } = useSWR<{ data: AuthUser }>('/api/auth/user', fetcher);

    return {
      data: data?.data,
      isLoading,
      error,
    };
  };

  return { useAuthUser };
}
