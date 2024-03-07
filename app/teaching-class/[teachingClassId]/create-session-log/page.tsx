'use client'

import { Box, Button, Checkbox, Input, Notification, Text, TextInput } from "@mantine/core"
import classes from "./create.module.css"
import { useFormState, useFormStatus } from "react-dom"
import createSessionLog from "./_actions/create-session-log"
import { notFound, useParams } from 'next/navigation';

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

const CreateSessionLogPage = () => {
    const [formState, formAction] = useFormState(createSessionLog, {
        success: false,
        message: "",
        // sessionLog: undefined,
    })

    const params = useParams();
    const { teachingClassId } = params

    if (teachingClassId == null) return notFound();

    return (
        <Box>
            <Text>Catat Sesi</Text>

            <form action={formAction}>
            
                <Input type="hidden" name="teachingClassId" value={teachingClassId} />

                <Box mt="md"
                    className={classes.box}
                >
                    <Checkbox
                        label="Kelas Pengganti"
                        name="kelasPengganti"
                        styles={{ input: { cursor: 'pointer' } }}
                    />
                </Box>

                <TextInput 
                    mt="md"
                    label="Materi Ajar" 
                    placeholder="e.g. Pengenalan Metode Penelitian X" 
                    name="materiAjar"
                    classNames={classes} 
                />
                <TextInput 
                    mt="md"
                    label="Catatan" 
                    placeholder="e.g. Siswa X tidak hadir" 
                    name="catatan"
                    classNames={classes} 
                />

                <SubmitButton />

            </form>
            {
                formState?.success === true && 
                <Notification title="Berhasil simpan catatan sesi ajar" />
            }
        </Box>
    )
}

export default CreateSessionLogPage