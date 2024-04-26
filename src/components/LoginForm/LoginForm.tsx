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
import useLoginForm, { LoginFormInput } from './useLoginForm';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { onSubmit, onInvalidSubmit } = useLoginForm();

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
      <FormControl isInvalid={errors.email && true}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', {
            required: 'Please enter your email',
          })}
          type="email"
          placeholder="Email"
        />
        <FormErrorMessage mt={1}>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password && true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            {...register('password', {
              required: 'Please enter you password',
            })}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
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

      <Button type="submit" isLoading={isSubmitting} w={'100%'}>
        Login
      </Button>
    </form>
  );
}
