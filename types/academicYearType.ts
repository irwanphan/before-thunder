export type AcademicYearType = {
  id: number;
  authorId: number | undefined;
  name: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};
