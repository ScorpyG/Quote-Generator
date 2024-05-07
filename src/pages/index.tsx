import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import { generateTestData } from '@/utils/helpers';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  // TODO: remove this an actually set up the API to consume the /api/quotes endpoint
  const quotes = generateTestData();

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
        {quotes.map((quote) => (
          <QuoteContainer {...quote} isAdmin={false} key={quote.id} />
        ))}
      </Box>
    </>
  );
}
