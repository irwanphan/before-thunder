"use server";

import prisma from "@/components/prisma";
import { JournalType } from "@lib/types/journalType";
import { z } from "zod";
// import { initialState } from "./create-journal-initial-state";

type CreateJournalResponse = {
  success: boolean,
  message: string,
  journal?: JournalType
}

export default async function createJournal(
  prevState: any,
  formData: FormData,
) {
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
    // kelasPengganti: z.string(),
    // materiAjar: z.string(),
    // catatan: z.string()
  });
  console.log(formData)
  const parsed = schema.safeParse({
    prodi: formData.get('prodi'),
    tahunAkademik: formData.get('tahunAkademik'),
    semester: formData.get('semester'),
    kelas: formData.get('kelas'),
    mataKuliah: formData.get('mataKuliah'),
    jumlahPertemuan: Number(formData.get('jumlahPertemuan')),
    setiapHari: formData.get('setiapHari')?.toString().split(","),
    periode: formData.get('periode'),
  });

  if (!parsed.success) {
    console.log(parsed.error.issues)
    return {
      success: false, 
      message: "Failed to create journal",
      // parsed
    };
  }
  const data = parsed.data;

  try {


    const journal = await prisma.journal.create({
      data: {
        authorId: 1,
        prodi: data.prodi,
        tahunAkademik: data.tahunAkademik,
        semester: data.semester,
        kelas: data.kelas,
        mataKuliah: data.mataKuliah,
        jumlahPertemuan: data.jumlahPertemuan,
        setiapHari: data.setiapHari.join(","),
        periode: 'asdf',
        periodeMulai: new Date('2012-10-10'),
        periodeSelesai: new Date('2012-10-10'),
        kelasPengganti: false,
        materiAjar: 'asdf',
        catatan: 'asdf'
      },
    });

    console.log(journal)
    // return journal

    return {
      success: true,
      message: "Journal created successfully",
      journal: journal
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.flatten().fieldErrors;

      throw err
    }

    throw err;
  }
}