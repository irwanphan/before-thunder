import prisma from "@components/prisma";
import { authOptions } from "@lib/auth-options";
import { Card, Flex, Button, Text } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AcademicYearTable from "./_components/AcademicYearTable";

async function getAcademicYear(userId: number) {
    return await prisma.academicYear.findMany(
        { 
            where: {
                authorId: userId
            }
        }
    );
}

const AcademicYearPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session === null) {
        redirect('/auth/signin');
    }
    // console.log('session: ', session);
    const email = session?.user?.email;
    if (!email) {
        redirect('/auth/signin');
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        redirect('/auth/signin');
    }
    const academicYears = await getAcademicYear(user.id);
    // console.log(academicYears);
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex>
            <Text size="lg" mr={16}>
                Daftar Tahun Akademik
            </Text>
            <Link href="/academic-year/create" passHref>
                <Button>Tambah Baru</Button>
            </Link>
        </Flex>
        {
            academicYears.length === 0 ?
            <Text mt={16}>
                Belum ada tahun akademik yang dibuat.
            </Text>
            : <AcademicYearTable academicYears={academicYears} />
        }
        </Card>
    );
}

export default AcademicYearPage;