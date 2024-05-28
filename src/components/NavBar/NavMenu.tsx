import useAuth from '@/hooks/useAuth';
import { GithubIcon, LoginIcon, LogoutIcon, ProfileIcon, RegisterIcon } from '@/utils/icons';
import { SettingsIcon } from '@chakra-ui/icons';
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function NavMenu() {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <>
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
          {isAuthenticated ? (
            <>
              <Link as={NextLink} href={`/profile`} _hover={{ textDecoration: 'none' }}>
                <MenuItem icon={<ProfileIcon fontSize={'16px'} />}>Profile</MenuItem>
              </Link>

              <MenuItem icon={<LogoutIcon fontSize={'16px'} />} onClick={signOut}>
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <Link as={NextLink} href={'signin'} _hover={{ textDecoration: 'none' }}>
                <MenuItem icon={<LoginIcon fontSize={'16px'} />}>Sign In</MenuItem>
              </Link>
              <Link as={NextLink} href={'signup'} _hover={{ textDecoration: 'none' }}>
                <MenuItem icon={<RegisterIcon fontSize={'16px'} />}>Sign Up</MenuItem>
              </Link>
            </>
          )}

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
    </>
  );
}
