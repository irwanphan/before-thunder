type InitialSessionLogType = {
  kelasPengganti: boolean;
  materiAjar: string;
  catatan: string;
};

export const initialState: InitialSessionLogType = {
  kelasPengganti: false,
  materiAjar: '',
  catatan: '',
};
