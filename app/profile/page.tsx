'use client';

import { Box, Button, Card, Flex, Text } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import { IconDoorExit } from '@tabler/icons-react';

const ProfilePage = () => {
  const { data } = useSession();
  console.log(data);

  const userProfile = data?.user;
  if (userProfile == null) return notFound();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex justify='space-between' w='100%' maw='100%'>
        <Box>
          <Text size="lg" fw={700}>
            Hello {userProfile.name}
          </Text>
          <Text size="md">email: {userProfile.email}</Text>
        </Box>
        
        <Button variant='outline' color='orange'
          onClick={() => { 
            signOut({
              callbackUrl: '/'
            }) 
          }}
        >
          Logout - <IconDoorExit size={16} />
        </Button>
      </Flex>
    </Card>
  )
}

export default ProfilePage;