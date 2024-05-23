import { theme } from '@/utils/theme';
import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';
import type { NextApiRequest } from 'next';
import { ReactNode } from 'react';

interface ChakraContextProps {
  cookies: string | undefined;
  children: ReactNode;
}

export function Chakra({ cookies, children }: ChakraContextProps) {
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

  return (
    <ChakraProvider
      colorModeManager={colorModeManager}
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'top-right' } }}
    >
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps(req: NextApiRequest) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}
