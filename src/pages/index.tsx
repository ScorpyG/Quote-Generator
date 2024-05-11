import QuoteContainer, { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data: quotes, error, isLoading } = useSWR<QuoteProps[]>('/api/quote/getQuotes', fetcher);

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
            <QuoteContainer {...quote} isAdmin={false} key={quote.id || i} />
          ))}
        </Box>
      </>
    );
  }
}
