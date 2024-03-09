'use client';

import {
  Box,
  Button,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import classes from './Dashboard.module.css';

const mockdata = [
  { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
  { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
  { title: 'Transfers', icon: IconRepeat, color: 'blue' },
  { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
  { title: 'Receipts', icon: IconReceipt, color: 'teal' },
  { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
  { title: 'Reports', icon: IconReport, color: 'pink' },
  { title: 'Payments', icon: IconCoin, color: 'red' },
  { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
];

const DashboardPage = () => {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      {/* <item.icon color={'grey'} size="2rem" /> */}
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Group justify="space-between">
        <Text className={classes.title}>Hi, Gustave</Text>
        {/* <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    + 21 other services
                </Anchor> */}
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>

      <Button onClick={() => signOut()}>OUT</Button>
    </Box>
  );
};

export default DashboardPage;
