import QuoteContainer, { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

// eslint-disable-next-line react/prop-types
export default function Home(quotes: Array<QuoteProps>) {
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

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/quotes');
  const quotes = await res.json();

  return {
    props: {
      quotes,
    },
  };
}
