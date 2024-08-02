import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import { Box, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In</title>
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
            Welcome back,
          </Heading>
          <Text fontSize={'x-large'} textAlign={'center'}>
            Sign in to your account
          </Text>
        </Box>
        <Box w={'lg'} border={'2px'} borderRadius={'lg'} borderColor={'gray.300'} p={4}>
          <LoginForm />
        </Box>
        <Box>
          <Text textAlign={'center'}>
            Don&apos;t have an account?{' '}
            <Link href={'/signup'}>
              <Text as={'b'} color={'purple.400'}>
                Register
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
}
