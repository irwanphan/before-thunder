'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';
import { notFound } from 'next/navigation';

export default async function createAcademicYear(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
  });
  // console.log(formData);
  const parsed = schema.safeParse({
    name: formData.get('name'),
  });

  if (!parsed.success) {
    // console.log(parsed.error.issues);
    return {
      success: false,
      message: 'Failed to create academic year',
    };
  }
  const { data } = parsed;
  // console.log(data);

  try {
    const session = await getServerSession(authOptions);
    if (!session || session === null) {
      return notFound;
    }

    const { email } = session.user;
    if (!email) {
      return notFound;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return notFound;
    }
    
    const academicYear = await prisma.academicYear.create({
      data: {
        authorId: 1,
        name: data.name,
      },
    });
    // console.log(academicYear);
    return {
      success: true,
      message: 'Department created successfully',
      academicYear: academicYear,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      // const errors = err.flatten().fieldErrors;
      throw err;
    }
    throw err;
  }
}
