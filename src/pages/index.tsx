'use client';

import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import { generateTestData } from '@/utils/demoData';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  // TODO: remove this after testing
  const demoDatas = generateTestData();

  return (
    <>
      <Head>
        <title>Quote Generator</title>
      </Head>
      <Box
        margin={'auto'}
        display={'flex'}
        flexDirection={'column'}
        gap={'20px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {demoDatas.map((quote, i) => (
          <QuoteContainer {...quote} key={i} />
        ))}
      </Box>
    </>
  );
}
