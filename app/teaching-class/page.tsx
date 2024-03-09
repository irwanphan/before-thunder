import prisma from '@components/prisma';
import TeachingClassTable from './_components/TeachingClassTable';
import Link from 'next/link';
import { Button, Card, Flex, Text } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';
import { redirect } from 'next/navigation';

const TeachingClassPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session === null) {
    redirect('/auth/signin');
  }
  console.log('session: ', session);
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

  const teachingClasses = await getTeachingClasses();
  // { user: session?.user }
  // console.log(teachingClasses);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex>
        <Text size="lg" mr={16}>
          Daftar Kelas Ajar
        </Text>
        <Link href="/teaching-class/create" passHref>
          <Button>Tambah Baru</Button>
        </Link>
      </Flex>
      <TeachingClassTable teachingClasses={teachingClasses} />
    </Card>
  );
};

async function getTeachingClasses() {
  return await prisma.teachingClass.findMany();
}

export default TeachingClassPage;
