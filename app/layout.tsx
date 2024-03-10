import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, Box, Flex } from '@mantine/core';
import Navbar from '@components/Navbar';
import CustomHeader from '@components/CustomHeader';
import { theme } from '../theme';

export const metadata = {
  title: 'BT',
  description: 'Teaching Journal App',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        {/* <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        /> */}
        <link rel="manifest" href="/manifest.json" />

        <CustomHeader />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Navbar />
          <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
            <Box p='lg' maw='1020px' w='100%'>
              {children}
            </Box>
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
