import prisma from "@components/prisma";
import { authOptions } from "@lib/auth-options";
import { Card, Flex, Button, Text } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import DepartmentTable from "./_components/DepartmentTable";

async function getDepartments(userId: number) {
    return await prisma.department.findMany(
        { 
            where: {
                authorId: userId
            }
        }
    );
}

const DepartmentPage = async () => {
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
    const departments = await getDepartments(user.id);
    console.log(departments);
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex>
            <Text size="lg" mr={16}>
                Daftar Program Studi
            </Text>
            <Link href="/department/create" passHref>
                <Button>Tambah Baru</Button>
            </Link>
        </Flex>
        {
            departments.length === 0 ?
            <Text mt={16}>
                Belum ada program studi yang dibuat.
            </Text>
            : <DepartmentTable departments={departments} />
            // : <></>
        }
        </Card>
    );
    }

export default DepartmentPage;