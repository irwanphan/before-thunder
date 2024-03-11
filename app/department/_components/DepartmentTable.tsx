'use client';

import Link from 'next/link';
import tableStyles from '@lib/tableStyles.module.css';

type DepartmentType = {
  id: number;
  name: string;
  headName: string;
  logo: string | null;
};
type DepartmentTableProps = {
  departments: DepartmentType[];
};

function TableRows({ departments }: DepartmentTableProps) {
  return departments.map((department) => (
    <tr key={department.id}>
      <td>{department.name}</td>
      <td>{department.headName}</td>
      <td>{department.logo}</td>
      <td>
        <Link href={`/department/${department.id}`}>Detail</Link>
      </td>
    </tr>
  ));
}

const DepartmentTable = ({ departments }: DepartmentTableProps) => {
  // console.log(departments)
  return (
    <div>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Nama Ketua</th>
            <th>Logo</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          <TableRows departments={departments} />
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
