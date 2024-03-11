'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';

export default async function createSessionLog(prevState: any, formData: FormData) {
  const schema = z.object({
    teachingClassId: z.number(),
    kelasPengganti: z.boolean(),
    materiAjar: z.string(),
    catatan: z.string(),
  });
  // console.log(formData)
  const parsed = schema.safeParse({
    teachingClassId: Number(formData.get('teachingClassId')),
    kelasPengganti: formData.get('kelasPengganti') === 'on',
    materiAjar: formData.get('materiAjar'),
    catatan: formData.get('catatan'),
  });

  if (!parsed.success) {
    // console.log(parsed.error.issues);
    return {
      success: false,
      message: 'Failed to create session log',
      // parsed
    };
  }
  const { data } = parsed;
  // console.log('parsed data: ', data);

  try {
    const session = await getServerSession(authOptions);
    if (!session || session === null) {
      return {
        success: false,
        message: 'User session not found',
      };
    }

    const { email } = session.user;
    if (!email) {
      return {
        success: false,
        message: 'User email not found',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    
    const sessionLog = await prisma.sessionLog.create({
      data: {
        teachingClass: {
          connect: {
            id: data.teachingClassId,
          },
        },
        kelasPengganti: data.kelasPengganti,
        materiAjar: data.materiAjar,
        catatan: data.catatan,
      },
    });

    return {
      success: true,
      message: 'Session Log created successfully',
      sessionLog: sessionLog,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
      };
    }
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}
