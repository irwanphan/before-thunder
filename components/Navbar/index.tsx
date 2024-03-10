'use client';

import Link from 'next/link';
import { Menu, Group, Center, Burger, Container, Anchor, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconDoorExit } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './Navbar.module.css';
import { signOut, useSession } from 'next-auth/react';


const Navbar = () => {
  const session = useSession();

  const [opened, { toggle }] = useDisclosure(false);

  const links = [
    { link: '/dashboard', label: 'Dashboard' },
    { link: '/teaching-class', label: 'Kelas Ajar' },
    {
      link: '#1',
      label: 'Master Data',
      links: [
        { link: '/academic-year', label: 'Tahun akademik' },
        { link: '/department', label: 'Program Studi' },
      ],
    },
    { link: `/profile`, label: 'Profil Saya' },
  ];

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label}>
        <Link href={item.link} passHref className={classes.link}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Center>
              <span className={classes.link}>{link.label}</span>
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Center>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        passHref
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Anchor href='/' 
            className={classes.logo} size='lg' fw={700} lts={1}
            >Before</Anchor>
          {
            (!session || !session?.data?.user)
            ? <>
                <Group gap={8}>
                  <Link href='/auth/signin' className={classes.link}>
                    <Text c='grey.5' fw={500} size='md'>
                      Login
                    </Text>
                  </Link> 
                  <ColorSchemeToggle />
                </Group>
              </>
            : <>
                <Group gap={6} visibleFrom="sm">
                  {items}
                  <Button variant='white' color='grey.5' px={8} fs='16px' radius='md'
                    onClick={() => { 
                      signOut({
                        callbackUrl: '/'
                      }) 
                    }}
                  >
                    Logout - <IconDoorExit size={16} />
                  </Button>
                  <ColorSchemeToggle />
                </Group>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
              </> 
          }
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
