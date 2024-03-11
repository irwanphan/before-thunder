'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';
import { authOptions } from '@lib/auth-options';
import { getServerSession } from 'next-auth';

export default async function createTeachingClass(prevState: any, formData: FormData) {
  const schema = z.object({
    // authorId: z.string(),
    prodi: z.string(),
    tahunAkademik: z.string(),
    semester: z.string(),
    kelas: z.string(),
    mataKuliah: z.string(),
    jumlahPertemuan: z.number(),
    setiapHari: z.array(z.string()),
    periode: z.string(),
    // periodeMulai: z.string(),
    // periodeSelesai: z.string(),
  });
  // console.log(formData);
  const parsed = schema.safeParse({
    prodi: formData.get('prodi'),
    tahunAkademik: formData.get('tahunAkademik'),
    semester: formData.get('semester'),
    kelas: formData.get('kelas'),
    mataKuliah: formData.get('mataKuliah'),
    jumlahPertemuan: Number(formData.get('jumlahPertemuan')),
    setiapHari: formData.get('setiapHari')?.toString().split(', '),
    periode: formData.get('periode'),
  });

  if (!parsed.success) {
    // console.log(parsed.error.issues);
    return {
      success: false,
      message: 'Failed to create teaching class',
      // parsed
    };
  }
  // const data = parsed.data;
  const { data } = parsed;

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
    
    const teachingClass = await prisma.teachingClass.create({
      data: {
        authorId: user.id,
        prodi: data.prodi,
        tahunAkademik: data.tahunAkademik,
        semester: data.semester,
        kelas: data.kelas,
        mataKuliah: data.mataKuliah,
        jumlahPertemuan: data.jumlahPertemuan,
        setiapHari: data.setiapHari.join(', '),
        periode: data.periode,
        periodeMulai: new Date('2012-10-10'),
        periodeSelesai: new Date('2012-10-10'),
      },
    });

    return {
      success: true,
      message: 'Teaching Class created successfully',
      teachingClass: teachingClass,
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
