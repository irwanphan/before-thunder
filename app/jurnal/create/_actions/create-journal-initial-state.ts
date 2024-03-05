import { JournalType } from "@lib/types/journalType";

export const initialState : JournalType = {
  authorId: undefined,
  prodi: '',
  tahunAkademik: '',
  semester: '',
  kelas: '',
  mataKuliah: '',
  jumlahPertemuan: 0,
  setiapHari: [],
  periode: '',
  periodeMulai: undefined,
  periodeSelesai: undefined,
  kelasPengganti: false,
  materiAjar: '',
  catatan: ''
}