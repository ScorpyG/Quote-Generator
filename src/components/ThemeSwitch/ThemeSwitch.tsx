import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

export default function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Theme Toggle"
      isRound={true}
      icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      bg={'transparent'}
      fontSize={'20px'}
      onClick={toggleColorMode}
    />
  );
}
