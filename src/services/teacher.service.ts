import api from "@/services/api";

export type Teacher = {
  _id: string;
  name: string;
  email: string;
};

export const loadTeachersApi = async (): Promise<Teacher[]> => {
  const res = await api.post("/v1/teachers/load", {});
  return res.data.data;
};