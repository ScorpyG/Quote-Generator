import { PROFANITY_WORDS } from '@/utils/helpers';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { QuoteFormInput } from '../AddQuoteForm/useAddQuoteForm';
import useEditQuoteForm from './useEditQuoteForm';

export default function EditQuoteForm({ quote, author, tags }: QuoteFormInput) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormInput>({
    defaultValues: {
      quote,
      author,
      tags,
    },
  });
  const { onSubmit, onInvalidSubmit } = useEditQuoteForm();

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
      <FormControl isInvalid={errors.quote && true} isRequired>
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

      <FormControl isInvalid={errors.author && true} isRequired>
        <FormLabel>Author</FormLabel>
        <Input
          {...register('author', {
            required: 'Please enter an author',
            validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
          })}
          placeholder="Enter the author"
          name="author"
          resize={'none'}
          variant={'filled'}
          h={'40px'}
          p={2}
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
          placeholder="Please enter tags"
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
        Save Change
      </Button>
    </form>
  );
}
