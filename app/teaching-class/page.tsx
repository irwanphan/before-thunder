import prisma from '@components/prisma';
import TeachingClassTable from './_components/TeachingClassTable';

const TeachingClassPage = async () => {
  const teachingClasses = await getTeachingClasses();
  // { user: session?.user }
  // console.log(teachingClasses);

  return (
    <div>
      <TeachingClassTable teachingClasses={teachingClasses} />
    </div>
  )
}

async function getTeachingClasses() {
  return await prisma.teachingClass.findMany();
}

export default TeachingClassPage;
