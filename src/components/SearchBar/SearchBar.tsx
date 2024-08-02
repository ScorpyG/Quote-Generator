import { PROFANITY_WORDS } from '@/utils/helpers';
import { SearchIcon } from '@chakra-ui/icons';
import { FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useSearchBar, { TSearchBar } from './useSearchBar';

export default function SearchBar({ searchQuery }: TSearchBar) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSearchBar>({
    defaultValues: {
      searchQuery,
    },
  });
  const { onSubmit, onInvalidSubmit } = useSearchBar();

  return (
    <FormControl
      isInvalid={errors.searchQuery && true}
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      // styling
      as={'form'}
      borderWidth={'5px'}
      borderColor={'purple.400'}
      borderRadius={'20px'}
      boxShadow={'6px 6px rgba(214, 188, 250, 0.5)'}
      padding={'6px'}
      marginX={'auto'}
      marginY={[2, 4]}
      width={['90%', ' 80%']}
    >
      <InputGroup>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Input
        {...register('searchQuery', {
          validate: (value) => !PROFANITY_WORDS.test(value) || 'Profanity is prohibited!',
        })}
        type="text"
        autoComplete="off"
        isDisabled={isSubmitting}
        placeholder="Search by tags"
        p={2}
        variant={'unstyled'}
      />
    </FormControl>
  );
}
