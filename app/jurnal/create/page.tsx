
'use client'
import { useState } from "react"
import { Box, Button, MultiSelect, NumberInput, Select, Text, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import classes from "./create.module.css"

const JurnalPage = () => {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return (
        <Box>
            <Text>Jurnal Perkuliahan</Text>


            <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['Bisnis Digital', 'Sistem & Teknologi Informasi', 'Kewirausahaan']}
                placeholder="Pilih Program Studi"
                label="Program Studi"
                classNames={classes}
            />
            <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['2023/2024']}
                placeholder="Pilih Tahun Akademik"
                label="Tahun Akademik"
                classNames={classes}
            />
            <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['ganjil', 'genap']}
                placeholder="Pilih Semester"
                label="Semester"
                classNames={classes}
            />
            <TextInput 
                mt="md"
                label="Kelas" 
                placeholder="Tulis Nama Kelas" 
                classNames={classes} 
            />
            <TextInput 
                mt="md"
                label="Mata Kuliah" 
                placeholder="Tulis Nama Mata Kuliah" 
                classNames={classes} 
            />
            <NumberInput 
                mt="md"
                label="Jumlah Pertemuan" 
                placeholder="Masukkan Jumlah Pertemuan" 
                classNames={classes} 
            />
            <MultiSelect
                mt="md"
                label="Setiap Hari"
                placeholder="Pilih Hari"
                data={['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']}
                clearable
                classNames={classes} 
            />

            <DatePickerInput
                mt="md"
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                value={value}
                onChange={setValue}
                classNames={classes} 
            />

            <Button
                mt="md"
                size="lg"
                className={classes.control}
                variant="gradient"
                gradient={{ from: 'blue', to: 'navy' }}
            >
                Simpan
          </Button>
        </Box>
    )
}

export default JurnalPage
