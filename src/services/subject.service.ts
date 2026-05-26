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

  LIST_SKILL_ID: string[];
  LIST_ACADEMIC_LEVEL_ID: string[];
  LIST_COURSE_PREREQUISITE_ID: string[];
  LIST_COURSE_PARALLEL_ID: string[];
  LIST_FIELD_OF_STUDY_ID: string[];
};

export type ApiListResponse<T> = {
  data?:
    | T[]
    | {
        data?: T[];
        items?: T[];
        docs?: T[];
        rows?: T[];
        result?: T[];
      };

  items?: T[];
  docs?: T[];
  rows?: T[];
  result?: T[];
};

export type FieldOfStudy = {
  _id: string;
  FIELD_OF_STUDY_NAME?: string;
  FOS_NAME?: string;
  name?: string;
};

export type Skill = {
  _id: string;
  SKILL_NAME?: string;
  name?: string;
};

export type AcademicLevel = {
  _id: string;
  ACADEMIC_LEVEL_NAME?: string;
  name?: string;
};

export type Course = {
  _id: string;
  COURSE_NAME?: string;
  name?: string;
};

const getApiArray = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data?.data) {
    return response.data.data;
  }

  if (response.data?.items) {
    return response.data.items;
  }

  if (response.data?.docs) {
    return response.data.docs;
  }

  if (response.data?.rows) {
    return response.data.rows;
  }

  if (response.data?.result) {
    return response.data.result;
  }

  if (response.items) {
    return response.items;
  }

  if (response.docs) {
    return response.docs;
  }

  if (response.rows) {
    return response.rows;
  }

  if (response.result) {
    return response.result;
  }

  return [];
};

export const createSubjectApi = async (
  payload: CreateSubjectPayload
) => {
  const response = await api.post("/v1/course/addCourse", payload);

  return response.data;
};

export const loadFieldOfStudyApi = async (): Promise<
  FieldOfStudy[]
> => {
  const response = await api.post<ApiListResponse<FieldOfStudy>>(
    "/v1/fos/load"
  );

  console.log("FOS RESPONSE:", response.data);

  return getApiArray<FieldOfStudy>(response.data);
};

export const loadSkillApi = async (
  LIST_FIELD_OF_STUDY_ID?: string[]
): Promise<Skill[]> => {
  const response = await api.post<ApiListResponse<Skill>>(
    "/v1/skill/load",
    {
      LIST_FIELD_OF_STUDY_ID:
        LIST_FIELD_OF_STUDY_ID || [],
    }
  );

  console.log("SKILL RESPONSE:", response.data);

  return getApiArray<Skill>(response.data);
};

export const loadAcademicLevelApi = async (): Promise<
  AcademicLevel[]
> => {
  const response = await api.post<
    ApiListResponse<AcademicLevel>
  >("/v1/academicLevel/load");

  console.log("ACADEMIC LEVEL RESPONSE:", response.data);

  return getApiArray<AcademicLevel>(response.data);
};

export const loadCourseByUserApi = async (
  USER_ID?: string
): Promise<Course[]> => {
  const response = await api.post<ApiListResponse<Course>>(
    "/v1/course/getListCourseByUser",
    {
      page: 1,
      limit: 20,
      USER_ID,
      sort_by: -1,
    }
  );

  console.log("COURSE RESPONSE:", response.data);

  return getApiArray<Course>(response.data);
}; 