import QuoteContainer, { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  // TODO: refactor this to fetch data from the API
  const [quotes, setQuotes] = useState<Array<QuoteProps>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/quote/getQuotes').then((res) => {
      setQuotes(res.data.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!quotes) {
    return <p>No data found</p>;
  }

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
          <QuoteContainer {...quote} isAdmin={false} key={quote.id || i} />
        ))}
      </Box>
    </>
  );
}
