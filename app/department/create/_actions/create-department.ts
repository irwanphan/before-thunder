'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth-options';

export default async function createDepartment(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    headName: z.string(),
    logo: z.string(),
  });
  // console.log(formData);
  const parsed = schema.safeParse({
    name: formData.get('name'),
    headName: formData.get('headName'),
    logo: formData.get('logo') || '',
  });

  if (!parsed.success) {
    // console.log(parsed.error.issues);
    return {
      success: false,
      message: 'Failed to create department',
    };
  }
  const { data } = parsed;
  // console.log(data);

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
    
    const department = await prisma.department.create({
      data: {
        authorId: user.id,
        name: data.name,
        headName: data.headName,
        logo: data.logo,
      },
    });
    // console.log(department);
    return {
      success: true,
      message: 'Department created successfully',
      department: department,
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
