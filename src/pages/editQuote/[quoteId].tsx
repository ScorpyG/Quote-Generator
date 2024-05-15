import EditQuoteForm from '@/components/Forms/EditQuoteForm/EditQuoteForm';
import useQuote from '@/hooks/useQuote';
import { Box, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function EditQuote() {
  const { query } = useRouter();
  const { useQuoteById } = useQuote();
  const { quote, isLoading, error } = useQuoteById(query.quoteId as string);

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
        {quote && !isLoading && !error ? (
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
