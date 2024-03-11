import { AcademicYearType } from '@/types/academicYearType';

export const initialState: AcademicYearType = {
  id: 0,
  authorId: undefined,
  name: '',
  isDefault: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
