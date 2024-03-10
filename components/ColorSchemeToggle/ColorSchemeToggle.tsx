'use client';

import { Switch, useMantineTheme, rem, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import classes from './ColorSchemaToggle.module.css';

export function ColorSchemeToggle() {
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  const handleThemeChange = () => {
    setTimeout(() => {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, 200);
  };

  return (
    <>
      <Switch 
        size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon}
        onClick={() => handleThemeChange()}
        classNames={classes}
      />
    </>
  ) 
}
