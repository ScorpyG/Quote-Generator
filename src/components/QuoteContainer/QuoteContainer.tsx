import { generateRandomColorScheme } from '@/utils/demoData';
import { Badge, Box, Divider, Stack, Text } from '@chakra-ui/react';

export interface QuoteProps {
  quote: string;
  author: string;
  tags: Array<string>;
}

export default function QuoteContainer(quoteProps: QuoteProps) {
  return (
    // TODO: make the card responsive
    <Box
      borderWidth={'5px'}
      borderColor={'#fbc1c0'}
      borderRadius={'20px'}
      boxShadow={'6px 6px rgba(255, 192, 203, 0.5)'}
      paddingX={'25px'}
      paddingY={'20px'}
      maxWidth={'650px'}
    >
      <Text>&quot;{quoteProps.quote}&quot;</Text>
      <Text textAlign={'right'} fontStyle={'italic'} fontWeight={600}>
        {quoteProps.author}
      </Text>
      {quoteProps.tags.length > 0 ? (
        <>
          <Divider marginTop={1} marginBottom={2} />
          <Stack direction={'row'}>
            {quoteProps.tags.map((tag, i) => (
              <Badge variant={'subtle'} colorScheme={generateRandomColorScheme()} key={i}>
                {tag}
              </Badge>
            ))}
          </Stack>
        </>
      ) : null}
    </Box>
  );
}
