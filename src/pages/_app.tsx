import NavBar from '@/components/NavBar/NavBar';
import { Chakra } from '@/context/CustomChakraProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      {/* TODO:  replace null with 404 page*/}
      <Suspense fallback={null}>
        <Head>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/light-logo.svg" media="(prefers-color-scheme: dark)" />
          <link rel="icon" href="/dark-logo.svg" media="(prefers-color-scheme: light)" />
        </Head>
        <main style={{ maxWidth: '1200px', margin: 'auto' }}>
          <NavBar />
          <Component {...pageProps} />
        </main>
      </Suspense>
    </Chakra>
  );
}
