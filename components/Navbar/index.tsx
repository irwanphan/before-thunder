'use client'

import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Navbar.module.css';
import Link from 'next/link';

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
  { link: '/profile', label: 'Profil Saya' },
//   { link: '/logout', label: 'Keluar' },
];

export function Navbar() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.label}>
                <Link href={item.link} passHref 
                    className={classes.link}
                >
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
            <Link passHref
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
                    <span>the ASDF</span>
                    <Group gap={5} visibleFrom="sm">
                        {items}
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}

export default Navbar;