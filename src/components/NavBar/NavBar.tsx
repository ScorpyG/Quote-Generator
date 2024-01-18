import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import NavMenu from './NavMenu';

export default function NavBar() {
  return (
    <Box padding={'20px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Link
        as={NextLink}
        href={'/'}
        _hover={{ textDecoration: 'none' }}
        textDecoration={'none'}
        fontSize={'2em'}
        fontWeight={600}
        bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
        bgClip={'text'}
      >
        Quote Generator
      </Link>
      <Box display={'flex'} gap={'20px'}>
        <ThemeSwitch />
        <NavMenu />
      </Box>
    </Box>
  );
}
