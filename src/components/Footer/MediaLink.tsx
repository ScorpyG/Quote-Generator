import { DEV_COMMUNITY_URL, LINKEDIN_URL, PERSONAL_GITHUB } from '@/utils/helpers';
import { DevCommunityIcon, GithubIcon, LinkedInIcon } from '@/utils/icons';
import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function MediaLink() {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
      <Link
        as={NextLink}
        href={LINKEDIN_URL}
        target="_blank"
        border={'1px'}
        borderRadius={'full'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'40px'}
        w={'40px'}
        fontSize={'xl'}
        _hover={{
          transform: 'translateY(-3px)',
        }}
      >
        <LinkedInIcon />
      </Link>
      <Link
        as={NextLink}
        href={PERSONAL_GITHUB}
        target="_blank"
        border={'1px'}
        borderRadius={'full'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'40px'}
        w={'40px'}
        fontSize={'xl'}
        _hover={{
          transform: 'translateY(-3px)',
        }}
      >
        <GithubIcon />
      </Link>
      <Link
        as={NextLink}
        href={DEV_COMMUNITY_URL}
        target="_blank"
        border={'1px'}
        borderRadius={'full'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'40px'}
        w={'40px'}
        fontSize={'xl'}
        _hover={{
          transform: 'translateY(-3px)',
        }}
      >
        <DevCommunityIcon />
      </Link>
    </Box>
  );
}
