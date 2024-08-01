import { BlogData } from '@/types/blog';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { format, isAfter } from 'date-fns';
import Image from 'next/image';

export default function BlogPost({ title, author, createdAt, updatedAt, contents, tags, image }: BlogData) {
  return (
    <Box width={'80%'} margin={'auto'} textAlign={'left'}>
      <Text fontSize={'4xl'} textAlign={'center'}>
        {title}
      </Text>

      <Flex justifyContent={'start'} alignItems={'center'} gap={1} marginY={4}>
        {isAfter(updatedAt, createdAt) ? (
          <Flex gap={2} justify={'flex-start'} align={'center'}>
            <Tag colorScheme={'green'} size={'md'} padding={1} borderRadius={6}>
              Updated
            </Tag>
            <Text>{format(updatedAt, 'd MMM, yyyy')}</Text>
          </Flex>
        ) : (
          <Flex gap={2} justify={'flex-start'} align={'center'}>
            <Tag size={'md'} padding={1} borderRadius={6}>
              Published
            </Tag>
            <Text>{format(createdAt, 'd MMM, yyyy')}</Text>
          </Flex>
        )}
        <Text as={'i'}>by</Text>
        <Text as={'b'}>{author}</Text>
      </Flex>

      {image && (
        <Box
          borderWidth={'5px'}
          borderColor={'#fbc1c0'}
          boxShadow={'6px 6px rgba(255, 192, 203, 0.5)'}
          padding={1}
          textAlign={'left'}
        >
          <Box h={'600px'} w={'100%'} position={'relative'}>
            <Image src={image} alt="Blog Image" fill placeholder="blur" blurDataURL={'/images/placeholder.png'} />
          </Box>
        </Box>
      )}

      {tags && (
        <Flex gap={3} marginTop={6} direction={'row'}>
          {tags.map((tag, i) => (
            <Tag colorScheme={'purple'} borderRadius={6} paddingX={2} paddingY={1} key={`${tag}_${i}`}>
              #{tag}
            </Tag>
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
