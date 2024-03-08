import prisma from '@components/prisma';
import TeachingClassTable from './_components/TeachingClassTable';
import Link from 'next/link';
import { Button, Card, Flex, Text } from '@mantine/core';

const TeachingClassPage = async () => {
    const teachingClasses = await getTeachingClasses();
    // { user: session?.user }
    // console.log(teachingClasses);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex>
                <Text size="lg" mr={16}>Daftar Kelas Ajar</Text>
                <Link href="/teaching-class/create" passHref>
                    <Button>Tambah Baru</Button>
                </Link>
            </Flex>
            <TeachingClassTable teachingClasses={teachingClasses} />
        </Card>
    )
}

async function getTeachingClasses() {
  return await prisma.teachingClass.findMany();
}

export default TeachingClassPage;
