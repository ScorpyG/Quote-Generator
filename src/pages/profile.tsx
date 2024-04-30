import ProfileForm from '@/components/Forms/ProfileForm/ProfileForm';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Profile() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === 'authenticated' && data) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <Box
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
          gap={'25px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box>
            <Heading as={'h1'} textAlign={'center'}>
              Hi, {data.user?.name}
            </Heading>
            <Text fontSize={'x-large'} textAlign={'center'}>
              Update your profile
            </Text>
          </Box>
          <Box w={'lg'} border={'2px'} borderRadius={'lg'} borderColor={'gray.300'} p={4}>
            <ProfileForm userSessionData={data} />
          </Box>
        </Box>
      </>
    );
  } else if (status === 'loading') {
    return <p>Loading...</p>; // TODO: custom skeleton loader
  } else {
    // TODO: unsure to use redirect() method or router.push()
    router.replace('/signin');
  }
}
