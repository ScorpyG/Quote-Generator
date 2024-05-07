import AddQuoteForm from '@/components/Forms/AddQuoteForm/AddQuoteForm';
import ProfileForm from '@/components/Forms/ProfileForm/ProfileForm';
import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import { generateTestData } from '@/utils/helpers';
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
  const [modalType, setModalType] = useState<'edit' | 'create' | null>(null);

  // TODO: remove this and setup the API to consume the /api/quotes of specific userId endpoint
  const quotes = generateTestData();

  if (status === 'authenticated' && data) {
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
          margin={'auto'}
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

        <Box
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
          gap={'25px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {quotes.map((quote) => (
            <QuoteContainer {...quote} isAdmin={true} key={quote.id} />
          ))}
        </Box>

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
  } else if (status === 'loading') {
    return <p>Loading...</p>; // TODO: custom skeleton loader
  } else {
    router.replace('/signin');
  }
}
