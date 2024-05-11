import { NAME_PATTERN } from '@/utils/helpers';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import useProfileForm, { ProfileFormInput } from './useProfileForm';

interface ProfileFormProps {
  userSessionData: Session | null;
}

export default function ProfileForm(profileFormProps: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInput>();
  const { onSubmit, onInvalidSubmit } = useProfileForm();

  // TODO: split user.name into first and last name
  const { userSessionData } = profileFormProps;

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={'2'} mb={2}>
        <Heading as={'h4'} size={'md'}>
          Personal Information
        </Heading>
        <Text fontSize={'md'}>These information are visible to other people.</Text>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <FormControl isInvalid={errors.firstName && true}>
          <FormLabel>First Name</FormLabel>
          <Input
            {...register('firstName', {
              required: 'Required Field',
              pattern: {
                value: NAME_PATTERN,
                message: 'Please enter your first name',
              },
            })}
            name="firstName"
            placeholder="First Name"
            variant={'filled'}
            defaultValue={userSessionData?.user?.name ?? 'First name'}
          />
          <FormErrorMessage mt={1}>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.lastName && true}>
          <FormLabel>Last Name</FormLabel>
          <Input
            {...register('lastName', {
              required: 'Required Field',
              pattern: {
                value: NAME_PATTERN,
                message: 'Please enter your last name',
              },
            })}
            name="lastName"
            placeholder="Last Name"
            variant={'filled'}
            defaultValue={userSessionData?.user?.name ?? 'Last name'}
          />
          <FormErrorMessage mt={1}>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          isLoading={isSubmitting}
          w={'full'}
          my={2}
          bgGradient={'linear(to-l, pink.400, purple.400)'}
          _hover={{
            bgGradient: 'linear(to-l, pink.200, purple.300)',
          }}
          textColor={'white'}
        >
          Save
        </Button>
      </form>
    </>
  );
}
