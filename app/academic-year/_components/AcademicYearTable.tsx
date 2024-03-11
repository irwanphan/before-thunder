'use client';

import Link from 'next/link';
import tableStyles from '@lib/tableStyles.module.css';

type AcademicYearType = {
  id: number;
  name: string;
};
type AcademicYearTableProps = {
  academicYears: AcademicYearType[];
};

function TableRows({ academicYears }: AcademicYearTableProps) {
  return academicYears.map((academicYear) => (
    <tr key={academicYear.id}>
      <td>{academicYear.name}</td>
      <td>
        <Link href={`/academic-year/${academicYear.id}`}>Detail</Link>
      </td>
    </tr>
  ));
}

const AcademicYearTable = ({ academicYears }: AcademicYearTableProps) => {
  // console.log(academicYears)
  return (
    <div>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          <TableRows academicYears={academicYears} />
        </tbody>
      </table>
    </div>
  );
};

export default AcademicYearTable;
