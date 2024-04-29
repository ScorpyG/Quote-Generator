import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm';
import { Box, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
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
            Welcome,
          </Heading>
          <Text fontSize={'x-large'} textAlign={'center'}>
            Let&apos;s share your <b>quote</b>
          </Text>
        </Box>
        <Box w={'lg'} border={'2px'} borderRadius={'lg'} borderColor={'gray.300'} p={4}>
          <SignUpForm />
        </Box>
      </Box>
    </>
  );
}
