import AddQuoteForm from '@/components/Forms/AddQuoteForm/AddQuoteForm';
import ProfileForm from '@/components/Forms/ProfileForm/ProfileForm';
import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import QuoteContainerSkeleton from '@/components/QuoteContainerSkeleton/QuoteContainerSkeleton';
import useQuote from '@/hooks/useQuote';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const { status, data } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useUserQuotes } = useQuote();
  const [modalType, setModalType] = useState<'edit' | 'create' | null>(null);

  // TODO: update the function to use the session user id instead of the hardcoded id
  const { quotes, isLoading } = useUserQuotes('65a9cd85fa2c4b5fd6214d42');

  if (status === 'authenticated' && quotes) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <Heading as={'h1'} textAlign={'center'} mb={'25px'}>
          Hi, {data.user?.name}
        </Heading>
        <Box
          w={'sm'}
          mx={'auto'}
          display={'flex'}
          flexDirection={'row'}
          gap={'25px'}
          justifyContent={'center'}
          alignItems={'center'}
          mb={'25px'}
        >
          <Button
            w={'full'}
            borderWidth={'2px'}
            borderColor={'#00a6fb'}
            borderRadius={'full'}
            boxShadow={'6px 6px rgba(5, 130, 202, 0.5)'}
            padding={'20px'}
            fontSize={'large'}
            background={'transparent'}
            _hover={{
              transform: 'auto',
              translateX: '4px',
              translateY: '4px',
              boxShadow: 'none',
            }}
            onClick={() => {
              setModalType('edit');
              onOpen();
            }}
          >
            Edit Profile
          </Button>

          <Button
            w={'full'}
            borderWidth={'2px'}
            borderColor={'#00a6fb'}
            borderRadius={'full'}
            boxShadow={'6px 6px rgba(5, 130, 202, 0.5)'}
            padding={'20px'}
            fontSize={'large'}
            background={'transparent'}
            _hover={{
              transform: 'auto',
              translateX: '4px',
              translateY: '4px',
              boxShadow: 'none',
            }}
            onClick={() => {
              setModalType('create');
              onOpen();
            }}
          >
            Create Quote
          </Button>
        </Box>

        {quotes.length > 0 ? (
          <Box
            margin={'auto'}
            display={'flex'}
            flexDirection={'column'}
            gap={'25px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {quotes.map((quote) => (
              <QuoteContainer {...quote} isAdmin={true} key={quote._id} />
            ))}
          </Box>
        ) : (
          <Stack spacing={7} margin={'auto'}>
            <Text fontSize={'lg'} fontWeight={700} textAlign={'center'}>
              You have not created any quotes yet
            </Text>
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
            <QuoteContainerSkeleton />
          </Stack>
        )}

        {/* ---------------------------------- Form Modal ---------------------------------- */}
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setModalType(null);
            onClose();
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{modalType === 'edit' ? 'Edit Profile' : 'Create Quote'}</ModalHeader>
            <ModalBody>{modalType === 'edit' ? <ProfileForm userSessionData={data} /> : <AddQuoteForm />}</ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else if (status === 'loading' || isLoading) {
    return (
      <Stack spacing={6} margin={'auto'}>
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
      </Stack>
    );
  } else {
    router.replace('/signin');
  }
}
