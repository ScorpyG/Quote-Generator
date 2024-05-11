import { PROFANITY_WORDS } from '@/utils/helpers';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useAddQuoteForm, { AddQuoteFormInput } from './useAddQuoteForm';

export default function AddQuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<AddQuoteFormInput>();

  const { onSubmit, onInvalidSubmit } = useAddQuoteForm();

  if (isSubmitSuccessful) {
    reset();
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} mb={2} textAlign={'center'}>
        <Heading as={'h4'} size={'md'}>
          What&apos;s on your mind?
        </Heading>
        <Text fontSize={'md'}>Share your thoughts with the world!</Text>
      </Box>
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
        <FormControl isInvalid={errors.quote && true}>
          <FormLabel>Quote</FormLabel>
          <Textarea
            {...register('quote', {
              required: 'Please enter a quote',
              validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
            })}
            placeholder="Enter your quote"
            name="quote"
            resize={'none'}
            variant={'filled'}
            h={'180px'}
            p={2}
          />
          <FormErrorMessage mt={1}>{errors.quote && errors.quote.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.author && true}>
          <FormLabel>Author</FormLabel>
          <Input
            {...register('author', {
              required: `Author's name is required`,
            })}
            placeholder="Enter the author"
            name="author"
            variant={'filled'}
          />
          <FormErrorMessage mt={1}>{errors.author && errors.author.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.tags && true}>
          <FormLabel>Tags</FormLabel>
          <Input
            {...register('tags', {
              required: 'Please enter tags',
              validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
            })}
            placeholder="Enter tags separated by commas"
            name="tags"
            variant={'filled'}
          />
          <FormErrorMessage mt={1}>{errors.tags && errors.tags.message}</FormErrorMessage>
        </FormControl>

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
          Add Quote
        </Button>
      </form>
    </>
  );
}
