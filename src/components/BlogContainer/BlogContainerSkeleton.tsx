import { Box, Skeleton } from '@chakra-ui/react';

export default function BlogContainerSkeleton() {
  return (
    <Box borderWidth={2} borderRadius={'lg'} padding={2} height={'lg'} w={'sm'}>
      <Skeleton height={'full'} width={'full'} startColor="purple.100" endColor="gray.200" />
    </Box>
  );
}
