import { generateRandomColor } from '@/lib/theme';
import { BlogData } from '@/types/blog';
import { PencilIcon } from '@/utils/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { format, isAfter } from 'date-fns';
import Image from 'next/image';
import useBlogContainer from './useBlogContainer';

interface BlogContainerProps extends BlogData {
  isAdmin?: boolean;
}

export default function BlogContainer({
  _id,
  title,
  createdAt,
  updatedAt,
  author,
  image,
  tags,
  isAdmin = false,
}: BlogContainerProps) {
  const { deletePostHandler, updateQueryParamToIncludePostId } = useBlogContainer();

  return (
    <Flex
      flexDirection={'column'}
      maxWidth={'sm'}
      height={'lg'}
      borderWidth={2}
      borderRadius={'lg'}
      overflow={'hidden'}
      position={'relative'}
    >
      {image && (
        <Box w={'full'} h={220} position={'relative'} overflow={'hidden'} borderBottomWidth={2}>
          <Image
            src={image}
            alt={'Blog post image'}
            // height={320}
            // width={600}
            // style={{ height: 'auto', width: 'auto' }}
            fill
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={'/images/placeholder.png'}
          />
        </Box>
      )}
      <Flex paddingX={4} paddingY={2} flexDirection={'column'} gap={3} flex={1}>
        <Text as={'b'} fontSize={image ? 'xl' : '2xl'}>
          {title}
        </Text>
        <Box>
          by <Text as={'b'}>{author}</Text>
        </Box>
        {isAfter(updatedAt, createdAt) ? (
          <Flex gap={2} justifyContent={'start'} alignItems={'center'}>
            <Badge colorScheme="green" width={'fit-content'}>
              Updated
            </Badge>
            <Text>{format(updatedAt, 'd MMM, yyyy')}</Text>
          </Flex>
        ) : (
          <Flex gap={2} justifyContent={'start'} alignItems={'center'}>
            <Badge colorScheme="gray" w={'fit-content'}>
              Published
            </Badge>
            <Text>{format(createdAt, 'd MMM, yyyy')}</Text>
          </Flex>
        )}

        {tags && tags.length > 0 && (
          <Flex gap={2}>
            {tags.map((tag, i) => (
              <Badge key={i} colorScheme={generateRandomColor()}>
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>
      <Flex gap={2} position={'absolute'} bottom={4} left={4} right={4}>
        {isAdmin && (
          <Button
            onClick={() => [
              // TODO: open edit form modal
              // eslint-disable-next-line no-console
              console.log('Edit button clicked'),
            ]}
          >
            <PencilIcon />
          </Button>
        )}

        <Button
          flexGrow={1}
          onClick={() => {
            updateQueryParamToIncludePostId(_id);
          }}
        >
          Read More
        </Button>
        {isAdmin && (
          <Button colorScheme="red" onClick={() => deletePostHandler(_id)}>
            <DeleteIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
