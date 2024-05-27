import { Button } from '@chakra-ui/react';

interface CustomButtonProps {
  buttonText: string;
  onClick: () => void;
  isLoading?: boolean;
  buttonType?: 'submit' | 'button' | 'reset';
}

export default function CustomButton({ buttonText, onClick, isLoading, buttonType }: CustomButtonProps) {
  return (
    <Button
      w={'full'}
      borderWidth={'2px'}
      borderColor={'#00a6fb'}
      borderRadius={'full'}
      boxShadow={'6px 6px rgba(5, 130, 202, 0.5)'}
      padding={'20px'}
      fontSize={'large'}
      background={'transparent'}
      _hover={{
        transform: 'auto',
        translateX: '4px',
        translateY: '4px',
        boxShadow: 'none',
      }}
      onClick={onClick}
      // Optional
      isLoading={isLoading}
      type={buttonType}
    >
      {buttonText}
    </Button>
  );
}
