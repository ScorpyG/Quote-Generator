import { Box, Text } from '@chakra-ui/react';
import MediaLink from './MediaLink';

export default function Footer() {
  return (
    <Box
      mx={'auto'}
      w={'100%'}
      padding={'20px'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Text
        fontSize={'large'}
        fontWeight={'500'}
        bgGradient={'linear(to-l, heroGradientStart, heroGradientEnd)'}
        bgClip={'text'}
      >
        &copy; {new Date().getFullYear()} Justin Hoang
      </Text>
      <MediaLink />
    </Box>
  );
}
