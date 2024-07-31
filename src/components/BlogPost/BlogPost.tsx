import { generateRandomColor } from '@/utils/helpers';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

export interface BlogPostProps {
  title: string;
  author: string;
  postedDate: string;
  contents: string[];
  imageUrl?: string;
  tags?: string[];
}

export default function BlogPost({ title, author, postedDate, contents, imageUrl, tags }: BlogPostProps) {
  return (
    <Box width={'80%'} margin={'auto'} textAlign={'left'}>
      <Text fontSize={'4xl'} textAlign={'center'}>
        {title}
      </Text>

      <Flex justifyContent={'start'} alignItems={'center'} gap={1} marginY={4}>
        <Text as={'b'}>{author}</Text>
        <Text>/ {postedDate}</Text>
      </Flex>

      {imageUrl && (
        <Box
          borderWidth={'5px'}
          borderColor={'#fbc1c0'}
          boxShadow={'6px 6px rgba(255, 192, 203, 0.5)'}
          padding={2}
          textAlign={'left'}
        >
          <Box h={'600px'} w={'100%'} position={'relative'}>
            <Image src={imageUrl} alt="Blog Image" fill priority />
          </Box>
        </Box>
      )}

      {tags && (
        <Flex gap={3} marginTop={6} direction={'row'}>
          {tags.map((tag, i) => (
            <Badge colorScheme={generateRandomColor()} borderRadius={'10px'} py={1} px={2} key={`${tag}_${i}`}>
              {tag}
            </Badge>
          ))}
        </Flex>
      )}

      {contents.map((content, i) => (
        <Text marginY={6} fontSize={['lg', 'xl']} key={i}>
          {content}
        </Text>
      ))}
    </Box>
  );
}
