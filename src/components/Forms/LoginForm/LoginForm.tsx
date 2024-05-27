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
import { TLogin } from '../../../types/auth';
import useLoginForm from './useLoginForm';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>();
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
              required: 'Please enter you password',
            })}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            variant={'filled'}
            autoComplete="current-password"
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

      <Button
        type="submit"
        isLoading={isSubmitting}
        w={'100%'}
        bgGradient={'linear(to-l, pink.400, purple.500)'}
        _hover={{
          bgGradient: 'linear(to-r, pink.300, purple.300)',
        }}
        textColor={'white'}
      >
        Login
      </Button>
    </form>
  );
}
