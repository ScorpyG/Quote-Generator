import EditQuoteForm from '@/components/Forms/EditQuoteForm/EditQuoteForm';
import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { Box, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all from from specified user
  // The route needs to be dynamic
  const result = await axios.get<{ data: QuoteProps[] }>('http://localhost:3000/api/quote/getAll');

  const paths = result.data.data.map((quote) => ({
    params: {
      quoteId: quote._id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  // The route needs to be dynamic
  const result = await axios.get<{ data: QuoteProps }>(`http://localhost:3000/api/quote/get/${params.quoteId}`);

  return {
    props: {
      quote: result.data.data, // Extract the 'quote' property from 'result.data'
    },
  };
};

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
