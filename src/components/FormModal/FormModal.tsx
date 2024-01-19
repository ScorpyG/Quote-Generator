import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

interface FormModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function FormModal(formModalProps: FormModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { isOpen, onClose } = formModalProps;

  const { status } = useSession();

  if (status === 'authenticated') {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent paddingBottom={4}>
        <ModalHeader>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'} alignItems={'center'} gap={2}>
            <Button w={'100%'} onClick={() => setIsLogin(true)} isActive={isLogin}>
              Login
            </Button>
            <Button w={'100%'} onClick={() => setIsLogin(false)} isActive={!isLogin}>
              Sign Up
            </Button>
          </Box>
        </ModalHeader>

        <ModalBody>{isLogin ? <LoginForm /> : <SignUpForm />}</ModalBody>

        {isLogin && (
          <ModalFooter justifyContent={'center'}>
            <Link as={NextLink} href={'/recovery'}>
              Forgot your password?
            </Link>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
