import { TRegister } from '@/types/auth';
import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN } from '@/utils/helpers';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSignUpForm from './useSignUpForm';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TRegister>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { onSubmit, onInvalidSubmit } = useSignUpForm();

  if (isSubmitSuccessful) {
    reset();
  }

  return (
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
            pattern: {
              value: NAME_PATTERN,
              message: 'Please enter text only',
            },
            required: 'Please enter your first name',
          })}
          name="firstName"
          placeholder="First Name"
          variant={'filled'}
        />
        <FormErrorMessage mt={1}>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.firstName && true}>
        <FormLabel>Last Name</FormLabel>
        <Input
          {...register('lastName', {
            pattern: {
              value: NAME_PATTERN,
              message: 'Please enter text only',
            },
            required: 'Please enter your last name',
          })}
          name="lastName"
          placeholder="Last Name"
          variant={'filled'}
        />
        <FormErrorMessage mt={1}>{errors.lastName && errors.lastName.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email && true}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', {
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Please enter a valid email address',
            },
            required: 'Please enter your email',
          })}
          name="email"
          placeholder="Email"
          type="email"
          variant={'filled'}
          autoComplete="email"
        />
        <FormErrorMessage mt={1}>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password && true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            {...register('password', {
              pattern: {
                value: PASSWORD_PATTERN,
                message: 'Your password must contains at least 1 number, 1 uppercase letter, 1 special character.',
              },
              minLength: {
                value: 8,
                message: 'Your password must have at least 8 characters',
              },
              required: 'Please enter your password',
            })}
            name="password"
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            variant={'filled'}
            autoComplete="new-password"
          />
          <InputRightElement>
            <IconButton
              aria-label="Password Visibility"
              icon={isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              backgroundColor={'transparent'}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage mt={1}>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirmPassword && true}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            {...register('confirmPassword', {
              validate: (value) => value === watch('password') || 'You password must match',
              required: 'Please confirm your password',
            })}
            name="confirmPassword"
            placeholder="Confirm Password"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            variant={'filled'}
            autoComplete="new-password"
          />
          <InputRightElement>
            <IconButton
              aria-label="Password visibility"
              icon={isConfirmPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              backgroundColor={'transparent'}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage mt={1}>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        isLoading={isSubmitting}
        w={'100%'}
        mt={2}
        bgGradient={'linear(to-l, pink.400, purple.500)'}
        _hover={{
          bgGradient: 'linear(to-l, pink.300, purple.300)',
        }}
        textColor={'white'}
      >
        Sign Up
      </Button>
    </form>
  );
}
