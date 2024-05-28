import EditQuoteForm from '@/components/Forms/EditQuoteForm/EditQuoteForm';
import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { getAllQuotes, getQuoteById } from '@/lib/serverless';
import { Box, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = (async () => {
  const quotes = await getAllQuotes();

  const paths = quotes.map((quote) => ({
    params: {
      quoteId: quote._id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
  const params = context.params!;
  const quote = await getQuoteById(params.quoteId as string);
  const quoteData = JSON.parse(JSON.stringify(quote));

  return {
    props: {
      quote: quoteData,
    },
  };
}) satisfies GetStaticProps<{ quote: QuoteProps }>;

export default function EditQuote({ quote }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Box textAlign={'center'}>
        <Heading as={'h1'} size={'lg'}>
          Change your mind?
        </Heading>
        <Text fontSize={'lg'}>Update your post</Text>
      </Box>
      <Box
        borderWidth={4}
        borderRadius={'20px'}
        borderColor={'purple.400'}
        boxShadow={'6px 6px rgba(214, 188, 250, 0.8)'}
        padding={'20px'}
        width={'650px'}
        margin={'auto'}
      >
        {quote ? (
          <EditQuoteForm quote={quote?.quote} author={quote.author} tags={quote.tags.toString()} />
        ) : (
          <Stack spacing={4}>
            <Skeleton height={'300px'} borderRadius={'lg'} />
            <Skeleton height={'100px'} borderRadius={'lg'} />
            <Skeleton height={'42px'} borderRadius={'lg'} />
          </Stack>
        )}
      </Box>
    </>
  );
}
