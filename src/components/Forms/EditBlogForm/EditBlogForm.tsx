import { BlogFormInput } from '@/types/blog';
import { PROFANITY_WORDS } from '@/utils/helpers';
import { ImageIcon } from '@/utils/icons';
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useDropzone } from '@uploadthing/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import styles from './blogImageDropzone.module.css';
import useEditBlogForm from './useEditBlogForm';

interface BlogFormInputProps {
  title: string;
  author: string;
  contents: string[];
  tags?: string[];
  image?: string;
}

export default function EditBlogForm({ title, author, contents, tags, image }: BlogFormInputProps) {
  const { onSubmit, onInvalidSubmit } = useEditBlogForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BlogFormInput>({
    defaultValues: {
      title,
      author,
      tags: tags ? tags.join(', ') : '',
      contents: contents.map((block) => ({ block })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'contents',
    control,
  });

  const [propBlogImg, setPropBlogImg] = useState<string | undefined>(image);
  const [blogImgPreview, setBlogImgPreview] = useState<(File & { preview: string }) | null>(null);
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
      setBlogImgPreview(Object.assign(file, { preview }));
    },
  });

  // https://react-dropzone.js.org/#!/Previews
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (blogImgPreview) {
      return () => URL.revokeObjectURL(blogImgPreview.preview);
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
        gap: 10,
      }}
    >
      <FormControl isInvalid={errors.title && true}>
        <FormLabel>Title</FormLabel>
        <Input
          {...register('title', {
            required: 'Please enter a title',
            maxLength: {
              value: 60,
              message: 'Title should not exceed 60 characters',
            },
            validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
          })}
          placeholder="Enter the title"
          title="title"
          variant={'filled'}
          type="text"
        />
        <FormErrorMessage mt={1}>{errors.title && errors.title.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Content</FormLabel>
        <Stack spacing={4}>
          {fields.map((field, index) => {
            return (
              <Box key={`${field.block}_${index}`}>
                <Box position={'relative'}>
                  <Textarea
                    key={field.id}
                    {...register(`contents.${index}.block`, {
                      required: 'Please enter some text',
                      validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
                    })}
                    isInvalid={errors.contents && errors.contents[index] && true}
                    placeholder="Enter text..."
                    resize={'none'}
                    variant={'filled'}
                    height={170}
                    py={2}
                    paddingLeft={3}
                    paddingRight={12} // 3rem = 48px (avoid overlapping with the delete button)
                    position={'relative'}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      colorScheme={'gray'}
                      color={'red.400'}
                      top={1}
                      right={1}
                      position={'absolute'}
                      zIndex={10}
                      p={1}
                    >
                      <SmallCloseIcon />
                    </Button>
                  )}
                </Box>
                <FormErrorMessage mt={1}>{errors.contents && errors.contents[index]?.block?.message}</FormErrorMessage>
              </Box>
            );
          })}
        </Stack>

        <Button type="button" onClick={() => append({ block: '' })} colorScheme={'blue'} w={'full'} marginTop={2}>
          <AddIcon />
        </Button>
      </FormControl>

      <FormControl isInvalid={errors.author && true}>
        <FormLabel>Author</FormLabel>
        <Input
          {...register('author', {
            validate: {
              // skip validate for optional field if empty - https://github.com/react-hook-form/react-hook-form/issues/1781
              containsProfanity: (value) =>
                value === undefined || !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
            },
          })}
          placeholder="Enter the author"
          name="author"
          variant={'filled'}
          type="text"
        />
        <FormErrorMessage mt={1}>{errors.author && errors.author.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.tags && true}>
        <FormLabel>Tags (Separate tags by commas)</FormLabel>
        <Input
          {...register('tags', {
            validate: {
              // skip validate for optional field if empty - https://github.com/react-hook-form/react-hook-form/issues/1781
              containsProfanity: (value) =>
                value === undefined || !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
            },
          })}
          placeholder="Enter tags separated by commas"
          name="tags"
          variant={'filled'}
          type="text"
        />
        <FormErrorMessage mt={1}>{errors.tags && errors.tags.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Image</FormLabel>
        {blogImgPreview || propBlogImg ? (
          <Flex
            height={'fit-content'}
            width={'full'}
            borderWidth={4}
            borderStyle={'dashed'}
            p={1}
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
            overflow={'hidden'}
            margin={'auto'}
          >
            {blogImgPreview && (
              <Image
                src={blogImgPreview.preview}
                height={360}
                width={640}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
                alt="Blog Image"
                onLoad={() => {
                  URL.revokeObjectURL(blogImgPreview.preview);
                }}
                onClick={() => {
                  URL.revokeObjectURL(blogImgPreview.preview);
                  setBlogImgPreview(null);
                }}
              />
            )}

            {propBlogImg && (
              <Image
                src={propBlogImg}
                height={360}
                width={640}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
                alt="Blog Image"
                onClick={() => {
                  setPropBlogImg(undefined);
                }}
              />
            )}
          </Flex>
        ) : (
          <div className={styles.dropzone} {...getRootProps()} {...register('image')}>
            <input name="image" {...getInputProps()} />
            <ImageIcon boxSize={['2em', null, '4em']} />
            <Text size={'sm'}>Choose image file or drag and drop</Text>
            <Text as="b" fontSize={'sm'}>
              Accept .JPEG (.JPG) or .PNG
            </Text>
          </div>
        )}
      </FormControl>

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitSuccessful}
        width={'full'}
        bgGradient={'linear(to-l, pink.400, purple.500)'}
        _hover={{
          bgGradient: 'linear(to-r, pink.300, purple.300)',
        }}
        textColor={'white'}
      >
        Update
      </Button>
    </form>
  );
}
