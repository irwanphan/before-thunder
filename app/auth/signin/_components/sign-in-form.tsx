'use client';

import { Button, Card, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

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
    <Card>
      <Text>It&aposs Raining</Text>
      Enter your email below to login
      <TextInput
        id="username"
        type="text"
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
        className="w-full"
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
  );
}
