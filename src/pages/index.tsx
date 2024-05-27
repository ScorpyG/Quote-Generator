import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import QuoteContainerSkeleton from '@/components/QuoteContainerSkeleton/QuoteContainerSkeleton';
import useQuote from '@/hooks/useQuote';
import { Stack } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  const { useAllQuotes } = useQuote();
  const { quotes, isLoading } = useAllQuotes();

  return (
    <>
      <Head>
        <title>Quote Generator</title>
      </Head>
      <Stack spacing={6} margin={'auto'}>
        {!isLoading && quotes && quotes?.length > 0 ? (
          quotes.map((quote, i) => <QuoteContainer {...quote} isAdmin={false} key={quote._id ?? i} />)
        ) : (
          <>
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
          </>
        )}
      </Stack>
    </>
  );
}
