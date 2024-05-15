import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import useQuote from '@/hooks/useQuote';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  const { useAllQuotes } = useQuote();
  const { quotes, isLoading, error } = useAllQuotes();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error || !quotes) {
    return <p>No data found</p>;
  } else {
    return (
      <>
        <Head>
          <title>Quote Generator</title>
        </Head>
        <Box
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
          gap={'25px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {quotes.map((quote, i) => (
            <QuoteContainer {...quote} isAdmin={false} key={quote._id ?? i} />
          ))}
        </Box>
      </>
    );
  }
}
