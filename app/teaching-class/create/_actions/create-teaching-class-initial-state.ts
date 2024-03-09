import { TeachingClassType } from '@/types/teachingClassType';

export const initialState: TeachingClassType = {
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
};
