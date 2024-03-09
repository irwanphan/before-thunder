'use client';

import classes from './TeachingClassDetailTable.module.css';

type TeachingClassDetailType = {
  id: number;
  teachingClassId: number;
  kelasPengganti: boolean;
  materiAjar: string;
  catatan: string;
  createdAt: Date;
  updatedAt: Date;
};
type TeachingClassDetailTableProps = {
  teachingClassSessions: TeachingClassDetailType[];
};

function TableRows({ teachingClassSessions }: TeachingClassDetailTableProps) {
  return teachingClassSessions.map((teachingClassSession) => (
    <tr key={teachingClassSession.id}>
      <td>{teachingClassSession.createdAt.toString()}</td>
      <td>{teachingClassSession.materiAjar}</td>
      <td>{teachingClassSession.catatan}</td>
      {/* <td> */}
      {/* delete or edit actions later */}
      {/* </td> */}
    </tr>
  ));
}

const TeachingClassTable = ({ teachingClassSessions }: TeachingClassDetailTableProps) => {
  // console.log(teachingClasses)
  return (
    <div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Materi Ajar</th>
            <th>Catatan</th>
            {/* <th>...</th> */}
          </tr>
        </thead>
        <tbody>
          <TableRows teachingClassSessions={teachingClassSessions} />
        </tbody>
      </table>
    </div>
  );
};

export default TeachingClassTable;
