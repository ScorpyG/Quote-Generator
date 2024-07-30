import { ChatIcon, EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import BlogForm from '../Forms/BlogForm/BlogForm';
import ImageUploader from '../Forms/ImageUploader/ImageUploader';
import ProfileForm from '../Forms/ProfileForm/ProfileForm';

export interface HeaderProps {
  userFirstName: string;
  userLastName: string;
  userProfileImage?: string;
}

export default function Header({ userFirstName, userLastName, userProfileImage }: HeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'edit' | 'create' | 'upload' | null>(null);

  return (
    <>
      <Flex
        flexDirection={['column', 'column', 'row']}
        justifyContent={'center'}
        alignItems={'center'}
        gap={[4, 8, 12]}
        marginBottom={8}
      >
        <Image
          width={200}
          height={200}
          src={userProfileImage || '/images/blank.jpg'}
          alt="User profile image"
          style={{
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#9AE6B4',
            borderRadius: '50%',
            padding: '4px',

            cursor: 'pointer',
          }}
          onClick={() => {
            setModalType('upload');
            onOpen();
          }}
        />
        <Flex flexDirection={'column'} gap={4}>
          <Heading as={'h1'} textAlign={'center'}>
            {`${userFirstName} ${userLastName}`}
          </Heading>
          <Stack w={'sm'} mx={'auto'} direction={'row'} spacing={'25px'}>
            <CustomButton
              buttonText="Edit Profile"
              icon={<EditIcon />}
              onClick={() => {
                setModalType('edit');
                onOpen();
              }}
            />
            <CustomButton
              buttonText="Create Post"
              icon={<ChatIcon />}
              onClick={() => {
                setModalType('create');
                onOpen();
              }}
            />
          </Stack>
        </Flex>
      </Flex>

      {/* ---------------------------------- Form Modal ---------------------------------- */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setModalType(null);
          onClose();
        }}
        isCentered
        size={modalType === 'create' ? '4xl' : 'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            {modalType === 'edit'
              ? 'Edit Profile'
              : modalType === 'create'
                ? 'Create Blog Post'
                : 'Update Profile Image'}
          </ModalHeader>
          <ModalBody>
            {modalType === 'edit' ? (
              <ProfileForm firstName={userFirstName} lastName={userLastName} />
            ) : modalType === 'create' ? (
              // <AddQuoteForm />
              <BlogForm />
            ) : (
              <ImageUploader />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
