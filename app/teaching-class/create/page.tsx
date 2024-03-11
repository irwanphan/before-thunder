'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, Button, MultiSelect, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import createTeachingClass from './_actions/create-teaching-class';
import classes from './create.module.css';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button mt="md" className={classes.control} type="submit" disabled={pending}>
      Simpan
    </Button>
  );
};

const CreateTeachingClassPage = () => {
  const [formState, formAction] = useFormState(createTeachingClass, {
    success: false,
    message: '',
    // teachingClass: undefined,
  });
  const router = useRouter();
  if (formState.success) {
    notifications.show({
      title: 'Simpan kelas ajar',
      message: 'Anda bakal di-redirect ke halaman sebelumnya ya! 🤥',
    });
    router.push('/teaching-class', { scroll: false });
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text>Kelas Ajar Baru</Text>

      <form action={formAction}>
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['Bisnis Digital', 'Sistem & Teknologi Informasi', 'Kewirausahaan']}
          placeholder="Pilih Program Studi"
          label="Program Studi"
          name="prodi"
          classNames={classes}
        />
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['2023/2024']}
          placeholder="Pilih Tahun Akademik"
          label="Tahun Akademik"
          name="tahunAkademik"
          classNames={classes}
        />
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['ganjil', 'genap']}
          placeholder="Pilih Semester"
          label="Semester"
          name="semester"
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Kelas"
          placeholder="Tulis Nama Kelas"
          name="kelas"
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Mata Kuliah"
          placeholder="Tulis Nama Mata Kuliah"
          name="mataKuliah"
          classNames={classes}
        />
        <NumberInput
          mt="md"
          label="Jumlah Pertemuan"
          placeholder="Masukkan Jumlah Pertemuan"
          name="jumlahPertemuan"
          classNames={classes}
        />
        <MultiSelect
          mt="md"
          label="Setiap Hari"
          placeholder="Pilih Hari"
          data={['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']}
          name="setiapHari"
          clearable
          classNames={classes}
        />

        <DatePickerInput
          mt="md"
          type="range"
          label="Pick dates range"
          placeholder="Pick dates range"
          name="periode"
          classNames={classes}
        />

        <SubmitButton />
      </form>
    </Card>
  );
};

export default CreateTeachingClassPage;
