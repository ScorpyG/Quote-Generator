import { Box, Skeleton } from '@chakra-ui/react';

export default function QuoteContainerSkeleton() {
  return (
    <Box
      borderWidth={'5px'}
      borderColor={'#fbc1c0'}
      borderRadius={'20px'}
      boxShadow={'6px 6px rgba(255, 192, 203, 0.5)'}
      padding={'10px'}
      w={'650px'}
    >
      <Skeleton h={'130px'} borderRadius={'xl'} endColor="gray.200" startColor="pink.100" />
    </Box>
  );
}
