import prisma from '@components/prisma';
import { Button, Card, Text } from '@mantine/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TeachingClassDetailTable from './_components/TeachingClassDetailTable';

async function getTeachingClassSessions(teachingClassId: number) {
  return await prisma.sessionLog.findMany({
    where: {
      teachingClassId: Number(teachingClassId),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

const TeachingClassDetailPage = async ({ params }: { params: { teachingClassId: number } }) => {
  const { teachingClassId } = params;
  const teachingClass = await prisma.teachingClass.findUnique({
    where: {
      id: Number(teachingClassId),
    },
  });

  if (teachingClass == null) return notFound();
  const teachingClassSessions = await getTeachingClassSessions(teachingClassId);
  // console.log(teachingClassSessions);

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={700}>
          Kelas {teachingClass.kelas}
        </Text>
        <Text size="md">Semester {teachingClass.semester}</Text>
        <Text size="md">Mata Kuliah {teachingClass.mataKuliah}</Text>
        <Text size="md">Setiap Hari {teachingClass.setiapHari}</Text>
        <Text size="md">Jumlah Pertemuan {teachingClass.jumlahPertemuan}</Text>
        <Text size="md">Periode {teachingClass.periode}</Text>
        <Link href={`/teaching-class/${teachingClassId}/create-session-log`}>
          <Button mt={16}>Catat sesi</Button>
        </Link>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder mt={16}>
        <Text>Sesi Ajar</Text>
        <TeachingClassDetailTable teachingClassSessions={teachingClassSessions} />
      </Card>
    </div>
  );
};

export default TeachingClassDetailPage;
