import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Textarea } from '@chakra-ui/react';
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
              // validate: (value) => value...
            })}
            placeholder="Enter your quote"
            name="quote"
            resize={'none'}
            variant={'filled'}
            h={'180px'}
            p={2}
          />
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
        </FormControl>
        <FormControl isInvalid={errors.tags && true}>
          <FormLabel>Tags</FormLabel>
          <Input
            {...register('tags', {
              required: 'Please enter tags',
              // validate: (value) => ...
            })}
            placeholder="Enter tags"
            name="tags"
            variant={'filled'}
          />
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
