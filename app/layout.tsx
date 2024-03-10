import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, Box, Flex } from '@mantine/core';
import Navbar from '@components/Navbar';
import CustomHeader from '@components/CustomHeader';
import { theme } from '../theme';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';
import SessionProvider from '@components/providers/SessionProvider';

export const metadata = {
  title: 'BT',
  description: 'Teaching Journal App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
        <CustomHeader />
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider theme={theme}>
            <Navbar />
            <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
              <Box p='lg' maw='1020px' w='100%'>
                {children}
              </Box>
            </Flex>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
