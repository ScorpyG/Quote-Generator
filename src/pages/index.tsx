import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import QuoteContainerSkeleton from '@/components/QuoteContainerSkeleton/QuoteContainerSkeleton';
import SearchBar from '@/components/SearchBar/SearchBar';
import useQuote from '@/hooks/useQuote';
import { Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const searchQuery = router.query.tag;
  const { useAllQuotes } = useQuote();
  const { quotes, isLoading } = useAllQuotes(typeof searchQuery === 'string' ? searchQuery : '');

  return (
    <>
      <Head>
        <title>Quote Generator</title>
      </Head>

      <SearchBar searchQuery={typeof searchQuery === 'string' ? searchQuery : ''} />

      {isLoading ? (
        <Stack spacing={6} flex={1} marginX={'auto'}>
          <QuoteContainerSkeleton />
          <QuoteContainerSkeleton />
          <QuoteContainerSkeleton />
          <QuoteContainerSkeleton />
          <QuoteContainerSkeleton />
        </Stack>
      ) : !quotes || quotes.length === 0 ? (
        <Text fontSize={'lg'} fontWeight={700} textAlign={'center'} margin={'auto'}>
          No quotes found
        </Text>
      ) : (
        <Stack spacing={6} margin={'auto'}>
          {quotes.map((quote, i) => (
            <QuoteContainer {...quote} isAdmin={false} key={quote._id ?? i} />
          ))}
        </Stack>
      )}
    </>
  );
}
