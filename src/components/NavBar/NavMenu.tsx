import { GithubIcon, LoginIcon, LogoutIcon, ProfileIcon } from '@/utils/icons';
import { SettingsIcon } from '@chakra-ui/icons';
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import FormModal from '../FormModal/FormModal';

export default function NavMenu() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO: implement authentication
  const { status } = useSession();

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
          {status === 'authenticated' ? (
            <>
              <Link as={NextLink} href={'/profile'} _hover={{ textDecoration: 'none' }}>
                <MenuItem icon={<ProfileIcon fontSize={'16px'} />}>Profile</MenuItem>
              </Link>

              <MenuItem icon={<LogoutIcon fontSize={'16px'} />} onClick={() => signOut()}>
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem icon={<LoginIcon fontSize={'16px'} />} onClick={onOpen}>
                Login / Register
              </MenuItem>
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

      <FormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
