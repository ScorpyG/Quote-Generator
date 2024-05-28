import { BugIcon, ExclamationIcon } from '@/utils/icons';
import { Divider, Heading, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Stack m={'auto'} direction={'row'} align={'center'} textAlign={'center'} height={'50px'}>
        <Heading size={'lg'} m={'auto'}>
          404
        </Heading>
        <Divider orientation="vertical" />
        <Text fontSize={'xl'}>Page Not Found</Text>
        <ExclamationIcon fontSize={'2xl'} />
        <BugIcon fontSize={'2xl'} />
      </Stack>
    </>
  );
}
