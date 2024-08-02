import { ImageIcon } from '@/utils/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from '@uploadthing/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './dropzone.module.css';
import useImageUploader, { ProfileImgFile } from './useImageUploader';

export default function ImageUploader() {
  const { onSubmit, onInvalidSubmit } = useImageUploader();
  const [imagePreview, setImagePreview] = useState<(File & { preview: string }) | null>(null);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitted },
  } = useForm<ProfileImgFile>();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setImagePreview(Object.assign(file, { preview }));
    },
  });

  // https://react-dropzone.js.org/#!/Previews
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview.preview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {imagePreview ? (
        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={320}
          width={'full'}
          marginBottom={4}
        >
          <Box w={300} h={300} borderRadius={'full'} borderWidth={4} position={'relative'} overflow={'hidden'}>
            <Image
              src={imagePreview.preview}
              alt="Profile Image"
              fill
              sizes="300px"
              style={{
                objectFit: 'contain',
              }}
              onLoad={() => {
                URL.revokeObjectURL(imagePreview.preview);
              }}
              onClick={() => {
                URL.revokeObjectURL(imagePreview.preview);
                setImagePreview(null);
              }}
            />
          </Box>
        </Flex>
      ) : (
        <div
          className={styles.dropzone}
          {...getRootProps()}
          {...register('file', {
            required: 'Please upload an image',
          })}
        >
          <input
            // ! this is set to hidden and cannot be register with react-hook-form
            // so we need to specific the name attribute in order to get the value/file
            name="file"
            {...getInputProps()}
          />
          <ImageIcon fontSize={'7xl'} />
          <Text as="b" marginTop={4}>
            Choose image file or drag and drop
          </Text>
          <Text as="i" fontSize={'sm'} marginTop={1}>
            Accept .JPEG (.JPG) or .PNG
          </Text>
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        isDisabled={isSubmitted}
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
