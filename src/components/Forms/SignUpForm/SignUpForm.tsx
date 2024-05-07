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
import useSignUpForm, { SignUpFormInput } from './useSignUpForm';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SignUpFormInput>();
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
              value: /^[A-Za-z]+$/,
              message: 'Please enter your name',
            },
            required: 'Required Field',
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
              value: /^[A-Za-z]+$/,
              message: 'Please enter your name',
            },
            required: 'Required Field',
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
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email address',
            },
            required: 'Required Field',
          })}
          name="email"
          placeholder="Email"
          type="email"
          variant={'filled'}
        />
        <FormErrorMessage mt={1}>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password && true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            {...register('password', {
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Your password must contains at least 1 number, 1 uppercase letter, 1 special character.',
              },
              minLength: {
                value: 8,
                message: 'Your password must have at least 8 characters',
              },
              required: 'Required Field',
            })}
            name="password"
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            variant={'filled'}
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
              required: 'Required Field',
            })}
            name="confirmPassword"
            placeholder="Confirm Password"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            variant={'filled'}
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