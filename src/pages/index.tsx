import { BlogContainer, BlogContainerSkeleton } from '@/components/BlogContainer';
import SearchBar from '@/components/SearchBar/SearchBar';
import useBlog from '@/hooks/useBlog';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const searchQuery = router.query.tag;

  const { useAllBlogPost } = useBlog();
  const { posts, isLoading, error } = useAllBlogPost(typeof searchQuery === 'string' ? searchQuery : '');

  return (
    <>
      <Head>
        <title>QuoteGen</title>
      </Head>

      <SearchBar searchQuery={typeof searchQuery === 'string' ? searchQuery : ''} />

      <Box flex={1} margin={'auto'} paddingY={[8, 12]}>
        {isLoading ? (
          <SimpleGrid gap={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
          </SimpleGrid>
        ) : !posts || posts.length === 0 || error ? (
          <Text fontSize={'lg'} fontWeight={700} textAlign={'center'} margin={'auto'}>
            No post found
          </Text>
        ) : (
          <SimpleGrid gap={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
            {posts.map((post, i) => (
              <BlogContainer key={post._id ?? i} {...post} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
