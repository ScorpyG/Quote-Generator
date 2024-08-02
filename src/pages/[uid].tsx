import { BlogContainer, BlogContainerSkeleton } from '@/components/BlogContainer';
import useBlog from '@/hooks/useBlog';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function UserBlog() {
  const { useAccountBlogsPage } = useBlog();
  const { posts, isLoading, error } = useAccountBlogsPage('johndoeje7779');

  if (posts && !isLoading && !error) {
    return (
      <>
        <Head>
          <title>Blogs</title>
        </Head>

        <Box marginX={'auto'} paddingY={4} flex={1}>
          {posts.length > 0 ? (
            <SimpleGrid spacing={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
              {posts.map((post) => (
                <BlogContainer key={post._id} {...post} />
              ))}
            </SimpleGrid>
          ) : (
            <Box margin={'auto'} flex={1}>
              <Text as={'b'}>This user doesn&apos;t have any blog post</Text>
            </Box>
          )}
        </Box>
      </>
    );
  } else {
    return (
      <Box marginX={'auto'} paddingY={4} flex={1}>
        <SimpleGrid spacing={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
          <BlogContainerSkeleton />
          <BlogContainerSkeleton />
          <BlogContainerSkeleton />
          <BlogContainerSkeleton />
          <BlogContainerSkeleton />
          <BlogContainerSkeleton />
        </SimpleGrid>
      </Box>
    );
  }
}
