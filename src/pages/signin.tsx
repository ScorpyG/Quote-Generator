import LoginForm from '@/components/LoginForm/LoginForm';
import { Box, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';

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
      </Box>
    </>
  );
}
