import Header from '@/components/ProfileSection/Header';
import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import QuoteContainerSkeleton from '@/components/QuoteContainerSkeleton/QuoteContainerSkeleton';
import useAuth from '@/hooks/useAuth';
import useQuote from '@/hooks/useQuote';
import { Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Profile() {
  const { useUserQuotes } = useQuote();
  const { quotes, isLoading } = useUserQuotes();
  const { user } = useAuth();

  if (quotes && !isLoading && user) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>

        <Header userFirstName={user.firstName} userLastName={user.lastName} userProfileImage={user.profileImgUrl} />

        {quotes.length > 0 ? (
          <Stack spacing={6} margin={'auto'}>
            {quotes.map((quote) => (
              <QuoteContainer {...quote} isAdmin={true} key={quote._id} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={6} margin={'auto'}>
            <Text fontSize={'lg'} fontWeight={700} textAlign={'center'}>
              You have not created any quotes yet
            </Text>
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
          </Stack>
        )}
      </>
    );
  } else {
    return (
      <Stack spacing={6} margin={'auto'}>
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
      </Stack>
    );
  }
}
