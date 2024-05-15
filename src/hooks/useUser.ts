import { fetcher } from '@/lib/swrFetcher';
import useSWR from 'swr';

export function useUser(userId: string) {
  const { data, isLoading, error } = useSWR(`/api/user/${userId}`, fetcher);

  return {
    user: data,
    isLoading,
    error,
  };
}
