'use client';

import Link from 'next/link';
import classes from '@lib/tableStyles.module.css';

type TeachingClassType = {
  id: number;
  prodi: string;
  tahunAkademik: string;
  semester: string;
  kelas: string;
  mataKuliah: string;
  jumlahPertemuan: number;
  setiapHari: string | string[];
  periode: string;
  periodeMulai: Date | undefined;
  periodeSelesai: Date | undefined;
};
type TeachingClassTableProps = {
  teachingClasses: TeachingClassType[];
};

function TableRows({ teachingClasses }: TeachingClassTableProps) {
  return teachingClasses.map((teachingClass) => (
    <tr key={teachingClass.id}>
      <td>{teachingClass.kelas}</td>
      <td>{teachingClass.mataKuliah}</td>
      <td>{teachingClass.setiapHari}</td>
      <td>
        <Link href={`/teaching-class/${teachingClass.id}`}>Detail</Link>
      </td>
    </tr>
  ));
}

const TeachingClassTable = ({ teachingClasses }: TeachingClassTableProps) => {
  // console.log(teachingClasses)
  return (
    <div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Kelas</th>
            <th>Mata Kuliah</th>
            <th>Setiap Hari</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          <TableRows teachingClasses={teachingClasses} />
        </tbody>
      </table>
    </div>
  );
};

export default TeachingClassTable;
