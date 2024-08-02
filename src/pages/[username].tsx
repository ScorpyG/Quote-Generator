import { BlogContainer, BlogContainerSkeleton } from '@/components/BlogContainer';
import useBlog from '@/hooks/useBlog';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function UserBlog() {
  const router = useRouter();
  const query = router.query.username as string;
  const { useAccountBlogsPage } = useBlog();
  const { posts, isLoading, error } = useAccountBlogsPage(query);

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>

      <Box flex={1} margin={'auto'} paddingY={[8, 12]}>
        {isLoading ? (
          <SimpleGrid gap={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
            <BlogContainerSkeleton />
          </SimpleGrid>
        ) : !posts || posts.length < 1 || error ? (
          <Text fontSize={'lg'} as={'b'} textAlign={'center'} margin={'auto'}>
            This user doesn&apos;t have any blog post
          </Text>
        ) : (
          <SimpleGrid spacing={6} columns={[1, null, null, 2, 3]} margin={'auto'}>
            {posts.map((post, i) => (
              <BlogContainer key={post._id ?? i} {...post} isSameUser={query === post.userId.username} />
            ))}
            {posts.length < 3 && (
              <>
                <BlogContainerSkeleton />
                <BlogContainerSkeleton />
              </>
            )}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
