import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { AuthProvider } from '@/contexts/AuthProvider';
import { Chakra } from '@/contexts/CustomChakraProvider';
import { fetcher } from '@/lib/swrFetcher';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <SWRConfig value={{ fetcher }}>
        <Chakra cookies={pageProps.cookies}>
          <Suspense fallback={null}>
            <Head>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/light-logo.svg" media="(prefers-color-scheme: dark)" />
              <link rel="icon" href="/dark-logo.svg" media="(prefers-color-scheme: light)" />
            </Head>
            <main
              style={{
                maxWidth: '1200px',
                margin: 'auto',
                // To push footer to bottom of page
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <NavBar />
              <Component {...pageProps} style={{ flex: 1 }} />
              <Footer />
            </main>
          </Suspense>
        </Chakra>
      </SWRConfig>
    </AuthProvider>
  );
}
