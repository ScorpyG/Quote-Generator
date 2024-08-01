import { BlogContainer, BlogContainerSkeleton } from '@/components/BlogContainer';
import Header from '@/components/ProfileSection/Header';
import useAuth from '@/hooks/useAuth';
import useBlog from '@/hooks/useBlog';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Profile() {
  const { useAccountBlogsProfilePage } = useBlog();
  const { posts, isLoading } = useAccountBlogsProfilePage();
  const { user, isAuthenticated } = useAuth();

  if (posts && !isLoading && user) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>

        <Header userFirstName={user.firstName} userLastName={user.lastName} userProfileImage={user.profileImgUrl} />

        {posts.length > 0 ? (
          <SimpleGrid spacing={6} columns={[1, null, null, 2, 3]} margin={'auto'} flex={1}>
            {posts.map((post) => (
              <BlogContainer key={post._id} {...post} isAdmin={isAuthenticated} />
            ))}
            {posts.length < 3 && (
              <>
                <BlogContainerSkeleton />
                <BlogContainerSkeleton />
              </>
            )}
          </SimpleGrid>
        ) : (
          <Text fontSize={'lg'} fontWeight={700} textAlign={'center'} flex={1}>
            You have not created any post yet
          </Text>
        )}
      </>
    );
  } else {
    return (
      <SimpleGrid spacing={6} columns={[1, null, null, 2, 3]} margin={'auto'} flex={1}>
        <BlogContainerSkeleton />
        <BlogContainerSkeleton />
        <BlogContainerSkeleton />
        <BlogContainerSkeleton />
        <BlogContainerSkeleton />
        <BlogContainerSkeleton />
      </SimpleGrid>
    );
  }
}
