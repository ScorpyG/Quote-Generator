import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import { generateTestData } from '@/utils/helpers';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
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
          <QuoteContainer {...quote} key={quote.id} />
        ))}
      </Box>
    </>
  );
}
