import AddQuoteForm from '@/components/Forms/AddQuoteForm/AddQuoteForm';
import QuoteContainer from '@/components/QuoteContainer/QuoteContainer';
import { generateTestData } from '@/utils/helpers';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  // TODO: remove this an actually set up the API to consume the /api/quotes endpoint
  const quotes = generateTestData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Quote Generator</title>
      </Head>

      <Box>
        <Button onClick={onOpen}>Text Modal</Button>
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
          <QuoteContainer {...quote} key={quote.id} />
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>Add Quote</ModalHeader>

          <ModalBody>
            <AddQuoteForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
