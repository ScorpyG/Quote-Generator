import { generateRandomColor } from '@/lib/theme';
import { BlogData } from '@/types/blog';
import { PencilIcon } from '@/utils/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { format, isAfter } from 'date-fns';
import Image from 'next/image';
import useBlogContainer from './useBlogContainer';

interface BlogContainerProps extends BlogData {
  isSameUser?: boolean;
  isAdmin?: boolean;
}

export default function BlogContainer({
  _id,
  title,
  userId: { username },
  createdAt,
  updatedAt,
  author,
  image,
  tags,
  isSameUser,
  isAdmin = false,
}: BlogContainerProps) {
  const { deletePostHandler, directToBlogPage, directEditBlogPage } = useBlogContainer();

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
            sizes="(min-width: 66em) 33vw, (min-width: 44em)"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={'/images/placeholder.png'}
          />
        </Box>
      )}
      <Flex paddingX={4} paddingY={2} flexDirection={'column'} gap={3} flex={1} userSelect={'none'} cursor={'default'}>
        <Text as={'b'} fontSize={image ? 'xl' : '2xl'}>
          {title}
        </Text>

        <Box>
          by{' '}
          {isAdmin || isSameUser ? (
            <Text as={'b'}>{author}</Text>
          ) : (
            <Link href={`/${username}`} fontWeight={800} _hover={{ color: 'blue.400' }}>
              {author}
            </Link>
          )}
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
          <Button onClick={() => [directEditBlogPage(_id)]}>
            <PencilIcon />
          </Button>
        )}

        <Button
          flexGrow={1}
          onClick={() => {
            directToBlogPage(_id);
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
