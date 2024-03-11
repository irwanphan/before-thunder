'use server';

import { z } from 'zod';
import prisma from '@/components/prisma';

export default async function createDepartment(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    headName: z.string(),
    // logo: z.string(),
  });
  console.log(formData);
  const parsed = schema.safeParse({
    name: formData.get('name'),
    headName: formData.get('headName'),
    // logo: formData.get('logo'),
  });

  if (!parsed.success) {
    // console.log(parsed.error.issues);
    return {
      success: false,
      message: 'Failed to create department',
    };
  }
  const { data } = parsed;
  console.log(data);

  try {
    const department = await prisma.department.create({
      data: {
        authorId: 1,
        name: data.name,
        headName: data.headName,
        // logo: data.logo,
      },
    });
    console.log(department);
    return {
      success: true,
      message: 'Department created successfully',
      department: department,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      // const errors = err.flatten().fieldErrors;
      throw err;
    }
    throw err;
  }
}
