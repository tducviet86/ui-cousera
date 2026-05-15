import api from "@/services/api";

export type CreateSubjectPayload = {
  IMAGE_AVATAR?: string;
  COURSE_NAME: string;
  COURSE_NAME_EN?: string;
  COURSE_CODE: string;
  DESCRIPTION?: string;
  DESCRIPTION_EN?: string;
  LIST_OUTCOME_TEXT?: {
    OUTCOME_TEXT: string;
    OUTCOME_TEXT_EN?: string;
  }[];
  LIST_TEACHER_USER_ID: string[];
  TOTAL_NUMBER_OF_STUDY_UNITS: number;
  STUDY_UNIT_UOM_NAME: "credit" | "unit" | "period_class";
};

export const createSubjectApi = async (payload: CreateSubjectPayload) => {
  const response = await api.post("v1/course/addCourse", payload);
  return response.data;
};