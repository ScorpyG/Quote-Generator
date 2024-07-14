import { Button, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from '@uploadthing/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './dropzone.module.css';
import useImageUploader from './useImageUploader';

export default function ImageUploader() {
  const { onSubmit, onInvalidSubmit } = useImageUploader();
  const [profileImage, setProfileImage] = useState<(File & { preview: string })[]>([]);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      setProfileImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => profileImage.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      style={{
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {profileImage.length > 0 && profileImage[0].preview ? (
        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={320}
          width={'full'}
          marginBottom={4}
        >
          <Image
            src={profileImage[0].preview}
            alt="Profile Image"
            height={300}
            width={300}
            style={{
              borderRadius: '50%',
              border: '4px solid #A0AEC0',
              padding: '4px',
            }}
            onLoad={() => {
              URL.revokeObjectURL(profileImage[0].preview);
            }}
            onClick={() => {
              URL.revokeObjectURL(profileImage[0].preview);
              setProfileImage([]);
            }}
          />
        </Flex>
      ) : (
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          <Text as="b">Choose image file or drag and drop</Text>
          <Text as="i" fontSize={'sm'} marginTop={1}>
            Accept .JPEG (.JPG) or .PNG
          </Text>
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        w={'full'}
        my={2}
        bgGradient={'linear(to-l, pink.400, purple.500)'}
        _hover={{
          bgGradient: 'linear(to-r, pink.300, purple.300)',
        }}
        textColor={'white'}
      >
        Upload
      </Button>
    </form>
  );
}
