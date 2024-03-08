'use client'

import { Box, Card, Button, Checkbox, Input, Text, TextInput } from "@mantine/core"
import classes from "./create.module.css"
import { useFormState, useFormStatus } from "react-dom"
import createSessionLog from "./_actions/create-session-log"
import { notFound, useParams, useRouter } from 'next/navigation';

const SubmitButton = () => {
    const { pending,  } = useFormStatus();
    return (
        <>
            <Button
                mt="md"
                className={classes.control}
                type="submit"
                disabled={pending}
            >
                Simpan
            </Button>
        </>
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
    const router = useRouter()

    if (teachingClassId == null) return notFound();
    if (formState.success) { router.push(`/teaching-class/${teachingClassId}`) }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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
        </Card>
    )
}

export default CreateSessionLogPage