import { z } from "zod";

export const createSubjectStep1Schema = z.object({
  IMAGE_AVATAR: z.string().optional(),

  COURSE_NAME: z.string().min(1, "Vui lòng nhập tên môn học"),
  COURSE_NAME_EN: z.string().optional(),
  COURSE_CODE: z.string().min(1, "Vui lòng nhập mã môn học"),

  DESCRIPTION: z.string().optional(),
  DESCRIPTION_EN: z.string().optional(),

  LIST_OUTCOME_TEXT: z
    .array(
      z.object({
        OUTCOME_TEXT: z.string().min(1, "Vui lòng nhập kết quả đầu ra"),
        OUTCOME_TEXT_EN: z.string().optional(),
      })
    )
    .optional(),

  LIST_TEACHER_USER_ID: z
    .array(z.string())
    .min(1, "Vui lòng chọn giảng viên"),

  TOTAL_NUMBER_OF_STUDY_UNITS: z.coerce
    .number()
    .min(1, "Số đơn vị học tập phải lớn hơn 0"),

  STUDY_UNIT_UOM_NAME: z.enum(["credit", "unit", "period_class"]),
});

export const createSubjectStep2Schema = z.object({
  LIST_SKILL_ID: z.array(z.string()).optional(),

  LIST_ACADEMIC_LEVEL_ID: z
    .array(z.string())
    .min(1, "Vui lòng chọn bậc học"),

  LIST_COURSE_PREREQUISITE_ID: z.array(z.string()).optional(),
  LIST_COURSE_PARALLEL_ID: z.array(z.string()).optional(),

  LIST_FIELD_OF_STUDY_ID: z
    .array(z.string())
    .min(1, "Vui lòng chọn ngành nghề"),
});

export const createSubjectStep3Schema = z.object({
  GRADE_REGULATION_ID: z.string().min(1, "Vui lòng chọn thang điểm"),

  LIST_LANGUAGE_ID: z
    .array(z.string())
    .min(1, "Vui lòng chọn ngôn ngữ"),

  IS_CHARGED_OR_FREE: z.enum(["FREE", "CHARGED"]),

  CHARGE_TYPE_ID: z.string().optional(),

  CHARGE_TYPE_AMOUNT: z.coerce.number().optional(),

  REQUIRED_TO_WATCH_THE_VIDEOS: z.boolean().default(false),
  REQUIRED_TO_COMPLETE_THE_ASSIGNMENTS: z.boolean().default(false),

  EXPIRY_ID: z.coerce.number().optional(),

  COURSE_ATTENDANCE_GRADE_PERCENT_NUMBER: z.coerce.number().min(0).max(100),
  COURSE_LIVE_STREAM_GRADE_PERCENT_NUMBER: z.coerce.number().min(0).max(100),

  ATTENDANCE_GRADED_TYPE: z.enum(["LESSON", "VIDEO"]),
  TYPE_GRADE_CALCULATED_VIDEO_DURATION: z.enum(["TOTAL", "EACH"]).optional(),

  NUMBER_GRADE_CALCULATED_VIDEO_DURATION_MIN_PERCENT: z.coerce
    .number()
    .min(0)
    .max(100)
    .optional(),

  BENCHMARK_TEST_COMPLETE_GRADE_PERCENTAGE_AUTOMATICALLY_ACHIEVE_MAX_ATTENDENCE_GRADE:
    z.coerce.number().min(0).max(100).optional(),

  IS_EVENLY_DISTRIBUTE_ATTENDANCE_GRADED: z.boolean().default(true),

  BENCHMARK_COMPLETE_COURSE_ACHIEVE_TEST_GRADE_PERCENTAGE: z.coerce
    .number()
    .min(0)
    .max(100)
    .optional(),

  ACCUMULATIVE_GRADED_OR_AVERAGE_GRADED: z.enum([
    "ACCUMULATIVE_GRADED",
    "AVERAGE_GRADED",
  ]),

  FRIST_VERSION_ID: z.string().optional(),
});

export const createSubjectSchema = createSubjectStep1Schema
  .merge(createSubjectStep2Schema)
  .merge(createSubjectStep3Schema)
  .superRefine((data, ctx) => {
    if (data.IS_CHARGED_OR_FREE === "CHARGED") {
      if (!data.CHARGE_TYPE_ID) {
        ctx.addIssue({
          code: "custom",
          path: ["CHARGE_TYPE_ID"],
          message: "Vui lòng chọn loại chi phí",
        });
      }

      if (!data.CHARGE_TYPE_AMOUNT || data.CHARGE_TYPE_AMOUNT <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["CHARGE_TYPE_AMOUNT"],
          message: "Vui lòng nhập số tiền",
        });
      }
    }

    if (data.ATTENDANCE_GRADED_TYPE === "VIDEO") {
      if (!data.NUMBER_GRADE_CALCULATED_VIDEO_DURATION_MIN_PERCENT) {
        ctx.addIssue({
          code: "custom",
          path: ["NUMBER_GRADE_CALCULATED_VIDEO_DURATION_MIN_PERCENT"],
          message: "Vui lòng nhập phần trăm thời lượng video",
        });
      }
    }
  });

export type CreateSubjectFormValues = z.infer<typeof createSubjectSchema>;