export type TeachingClassType = {
    authorId: number | undefined,
    prodi: string,
    tahunAkademik: string,
    semester: string,
    kelas: string,
    mataKuliah: string,
    jumlahPertemuan: number,
    setiapHari: string | string[],
    periode: string,
    periodeMulai: Date | undefined,
    periodeSelesai: Date | undefined,
}