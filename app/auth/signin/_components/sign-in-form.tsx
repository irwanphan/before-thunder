'use client';

import { Button, Card, Flex, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import inputStyles from '@lib/inputStyles.module.css'

type FormLoginValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [formLoginValues, setFormLoginValues] = useState<FormLoginValues>({
    email: '',
    password: '',
  });

  return (
    <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
      <Card maw='640px' w='100%'>
        <Text size='lg'>
          Enter your email below to login
        </Text>
        <TextInput
          id="username"
          type="text"
          classNames={inputStyles}
          mt={16}
          label="Email"
          placeholder="user@app.id"
          value={formLoginValues.email}
          onChange={(e) => {
            setFormLoginValues({
              ...formLoginValues,
              email: e.target.value,
            });
          }}
        />
        <TextInput
          id="password"
          type="password"
          classNames={inputStyles}
          mt={16}
          label="Password"
          placeholder="password"
          value={formLoginValues.password}
          onChange={(e) => {
            setFormLoginValues({
              ...formLoginValues,
              password: e.target.value,
            });
          }}
        />
        <Button
          mt={16}
          onClick={() =>
            signIn('credentials', {
              email: formLoginValues.email,
              password: formLoginValues.password,
              redirect: true,
              callbackUrl: '/',
            })
          }
        >
          Log In
        </Button>
      </Card>
    </Flex>
  );
}
