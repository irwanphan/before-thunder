'use client'

import { useFormState, useFormStatus } from "react-dom"
import { Box, Button, MultiSelect, Notification, NumberInput, Select, Text, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import createTeachingClass from "./_actions/create-teaching-class"
import classes from "./create.module.css"

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button
            mt="md"
            size="lg"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'navy' }}
            type="submit"
            disabled={pending}
        >
            Simpan
        </Button>
    )
}

const CreateTeachingClassPage = () => {
    const [formState, formAction] = useFormState(createTeachingClass, {
        success: false,
        message: "",
        teachingClass: undefined,
    })

    return (
        <Box>
            <Text>Kelas Ajar</Text>

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
            {
                formState?.success === true &&
                <Notification title="Berhasil simpan kelas ajar" />
            }
        </Box>
    )
}

export default CreateTeachingClassPage
