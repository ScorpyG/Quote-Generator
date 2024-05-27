import CustomButton from '@/components/CustomButton/CustomButton';
import AddQuoteForm from '@/components/Forms/AddQuoteForm/AddQuoteForm';
import ProfileForm from '@/components/Forms/ProfileForm/ProfileForm';
import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import QuoteContainerSkeleton from '@/components/QuoteContainerSkeleton/QuoteContainerSkeleton';
import useAuth from '@/hooks/useAuth';
import useQuote from '@/hooks/useQuote';
import {
  Box,
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
import Head from 'next/head';
import { useState } from 'react';

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'edit' | 'create' | null>(null);

  const { useUserQuotes } = useQuote();
  const { quotes, isLoading } = useUserQuotes();
  const { user } = useAuth();

  if (quotes && !isLoading && user) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <Heading as={'h1'} textAlign={'center'} mb={'25px'}>
          Hi, {`${user.firstName} ${user.lastName}`}
        </Heading>
        <Stack w={'sm'} mx={'auto'} direction={'row'} spacing={'25px'}>
          <CustomButton
            buttonText="Edit Profile"
            onClick={() => {
              setModalType('edit');
              onOpen();
            }}
          />
          <CustomButton
            buttonText="Create Quote"
            onClick={() => {
              setModalType('create');
              onOpen();
            }}
          />
        </Stack>

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
            <ModalBody>
              {modalType === 'edit' ? (
                <ProfileForm firstName={user.firstName} lastName={user.lastName} />
              ) : (
                <AddQuoteForm />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <Stack spacing={6} margin={'auto'}>
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
        <QuoteContainerSkeleton />
      </Stack>
    );
  }
}
