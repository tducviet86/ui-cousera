import api from "@/services/api";

export const uploadSubjectImageApi = async (file: File) => {
  const formData = new FormData();

  formData.append("files", file);

  const response = await api.post("/uploads/image/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};