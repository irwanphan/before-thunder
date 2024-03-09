'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';
// import { SessionLogType } from '@/types/sessionLogType';

// type CreateTeachingClassResponse = {
//   success: boolean;
//   message: string;
//   sessionLog?: SessionLogType;
// };

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

    // console.log(sessionLog);
    // return sessionLog

    return {
      success: true,
      message: 'Session Log created successfully',
      sessionLog: sessionLog,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      // const errors = err.flatten().fieldErrors;

      throw err;
    }

    throw err;
  }
}
