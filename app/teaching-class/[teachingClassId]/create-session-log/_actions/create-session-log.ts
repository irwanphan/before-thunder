"use server";

import prisma from "@/components/prisma";
import { SessionLogType } from "@lib/types/sessionLogType";
import { z } from "zod";

type CreateTeachingClassResponse = {
  success: boolean,
  message: string,
  sessionLog?: SessionLogType
}

export default async function createSessionLog(
  prevState: any,
  formData: FormData,
  teachingClassId: number
) {
  const schema = z.object({
    kelasPengganti: z.boolean(),
    materiAjar: z.string(),
    catatan: z.string(),
  });
  // console.log(formData)
  const parsed = schema.safeParse({
    kelasPengganti: formData.get("kelasPengganti") === "on" ? true : false,
    materiAjar: formData.get("materiAjar"),
    catatan: formData.get("catatan"),
  });

  if (!parsed.success) {
    console.log(parsed.error.issues)
    return {
      success: false, 
      message: "Failed to create session log",
      // parsed
    };
  }
  const data = parsed.data;
  console.log('parsed data: ', data)
  console.log('teachingClassId: ', teachingClassId)

  // try {


  //   const sessionLog = await prisma.sessionLog.create({
  //     data: {
  //       kelasPengganti: data.kelasPengganti,
  //       materiAjar: data.materiAjar,
  //       catatan: data.catatan,
  //     },
  //   });

  //   console.log(sessionLog)
  //   // return sessionLog

  //   return {
  //     success: true,
  //     message: "Session Log created successfully",
  //     sessionLog: sessionLog
  //   }
  // } catch (err) {
  //   if (err instanceof z.ZodError) {
  //     const errors = err.flatten().fieldErrors;

  //     throw err
  //   }

  //   throw err;
  // }
}