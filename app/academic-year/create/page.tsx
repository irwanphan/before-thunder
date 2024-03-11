'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import createDepartment from './_actions/create-department';
import inputStyles from '@lib/inputStyles.module.css';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button mt="md" className={inputStyles.control} type="submit" disabled={pending}>
      Simpan
    </Button>
  );
};

const CreateDepartmentPage = () => {
  const [formState, formAction] = useFormState(createDepartment, {
    success: false,
    message: '',
    department: undefined,
  });
  const router = useRouter();
  if (formState.success) {
    notifications.show({
      title: 'Simpan Tahun Akademik Berhasil',
      message: 'Anda bakal di-redirect ke halaman sebelumnya ya! 🤥',
    });
    router.push('/department', { scroll: false });
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text>Tahun Akademik Baru</Text>

      <form action={formAction}>
        <TextInput
          mt="md"
          label="Nama Tahun Akademik"
          placeholder="Tulis Nama Tahun Akademik"
          name="name"
          classNames={inputStyles}
        />

        <SubmitButton />
      </form>
    </Card>
  );
};

export default CreateDepartmentPage;
