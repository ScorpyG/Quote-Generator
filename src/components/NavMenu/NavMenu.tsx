import { GithubIcon, LoginIcon, LogoutIcon, ProfileIcon } from '@/utils/icons';
import { SettingsIcon } from '@chakra-ui/icons';
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function NavMenu() {
  // TODO: implement authentication
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound
        aria-label="Options"
        icon={<SettingsIcon />}
        variant={'outline'}
        bg={'transparent'}
        fontSize={'20px'}
        border={'none'}
      />
      <MenuList>
        <MenuItem
          icon={<LoginIcon fontSize={'16px'} />}
          // onClick={() => console.log('clicked login')}
        >
          Login / Register
        </MenuItem>

        <MenuItem
          icon={<LogoutIcon fontSize={'16px'} />}
          // onClick={() => console.log('clicked logout')}
        >
          Logout
        </MenuItem>

        <Link as={NextLink} href={'/profile'} _hover={{ textDecoration: 'none' }}>
          <MenuItem icon={<ProfileIcon fontSize={'16px'} />}>Profile</MenuItem>
        </Link>

        <Link
          as={NextLink}
          href="https://github.com/ScorpyG/Quote-Generator"
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          <MenuItem icon={<GithubIcon fontSize={'16px'} />}>Github Repository</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
