'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import createAcademicYear from './_actions/create-academic-year';
import inputStyles from '@lib/inputStyles.module.css';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button mt="md" className={inputStyles.control} type="submit" disabled={pending}>
      Simpan
    </Button>
  );
};

const CreateAcademicYearPage = () => {
  const [formState, formAction] = useFormState(createAcademicYear, {
    success: false,
    message: '',
    // academicYear: null,
  });
  const router = useRouter();
  if (formState.success) {
    notifications.show({
      title: 'Simpan Tahun Akademik Berhasil',
      message: 'Anda bakal di-redirect ke halaman sebelumnya ya! 🤥',
    });
    router.push('/academic-year', { scroll: false });
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

export default CreateAcademicYearPage;
