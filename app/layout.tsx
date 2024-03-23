import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, Box, Flex } from '@mantine/core';
import Navbar from '@components/Navbar';
import CustomHeader from '@components/CustomHeader';
import { theme } from '../theme';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';
import SessionProvider from '@components/providers/SessionProvider';
import { Metadata, Viewport } from 'next';

const APP_NAME = "Before Thunder";
const APP_DEFAULT_TITLE = "Teaching Journal App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Keep track of your teaching journey with Before Thunder. Start today";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  manifest: "/manifest.json",
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  // openGraph: {
  //   type: "website",
  //   siteName: APP_NAME,
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
  // twitter: {
  //   card: "summary",
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
