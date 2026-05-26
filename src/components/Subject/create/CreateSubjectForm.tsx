"use client";

import FormInput from "@/components/Subject/create/FormInput";
import SectionTitle from "@/components/Subject/create/SectionTitle";
import UploadSubjectImage from "@/components/Subject/create/UploadSubjectImage";
import { loadTeachersApi, Teacher } from "@/services/teacher.service";
import { BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type CreateSubjectStep1Data = {
  IMAGE_AVATAR?: string;
  COURSE_CODE: string;
  COURSE_NAME: string;
  COURSE_NAME_EN?: string;
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

type FormValues = {
  COURSE_CODE: string;
  COURSE_NAME: string;
  COURSE_NAME_EN?: string;
  TEACHER_ID: string;
  TOTAL_NUMBER_OF_STUDY_UNITS: number;
  OUTCOME_TEXT?: string;
  DESCRIPTION?: string;
  STUDY_UNIT_UOM_NAME: "credit" | "unit" | "period_class";
};

type Props = {
  defaultValues?: Partial<CreateSubjectStep1Data>;
  onNext: (data: CreateSubjectStep1Data) => void;
};

export default function CreateSubjectForm({
  defaultValues,
  onNext,
}: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [imageAvatar, setImageAvatar] = useState(
    defaultValues?.IMAGE_AVATAR || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      COURSE_CODE: defaultValues?.COURSE_CODE || "",
      COURSE_NAME: defaultValues?.COURSE_NAME || "",
      COURSE_NAME_EN: defaultValues?.COURSE_NAME_EN || "",
      TEACHER_ID: defaultValues?.LIST_TEACHER_USER_ID?.[0] || "",
      TOTAL_NUMBER_OF_STUDY_UNITS:
        defaultValues?.TOTAL_NUMBER_OF_STUDY_UNITS || 1,
      OUTCOME_TEXT: defaultValues?.LIST_OUTCOME_TEXT?.[0]?.OUTCOME_TEXT || "",
      DESCRIPTION: defaultValues?.DESCRIPTION || "",
      STUDY_UNIT_UOM_NAME:
        defaultValues?.STUDY_UNIT_UOM_NAME || "credit",
    },
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await loadTeachersApi();
        setTeachers(data);
      } catch (error) {
        console.log("Load teachers error:", error);
      }
    };

    fetchTeachers();
  }, []);

  const onSubmit = (data: FormValues) => {
    const step1Data: CreateSubjectStep1Data = {
      IMAGE_AVATAR: imageAvatar || "",
      COURSE_CODE: data.COURSE_CODE,
      COURSE_NAME: data.COURSE_NAME,
      COURSE_NAME_EN: data.COURSE_NAME_EN || "",
      DESCRIPTION: data.DESCRIPTION || "",
      DESCRIPTION_EN: "",
      LIST_OUTCOME_TEXT: data.OUTCOME_TEXT
        ? [
            {
              OUTCOME_TEXT: data.OUTCOME_TEXT,
              OUTCOME_TEXT_EN: "",
            },
          ]
        : [],
      LIST_TEACHER_USER_ID: [data.TEACHER_ID],
      TOTAL_NUMBER_OF_STUDY_UNITS: Number(
        data.TOTAL_NUMBER_OF_STUDY_UNITS
      ),
      STUDY_UNIT_UOM_NAME: data.STUDY_UNIT_UOM_NAME,
    };

    onNext(step1Data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        mx-auto
        flex
        w-full
        max-w-7xl
        flex-col
        rounded-2xl
        bg-white
        p-4
        shadow-sm

        sm:p-5

        lg:max-h-[calc(100vh-110px)]
        lg:overflow-y-auto
        lg:p-6

        2xl:max-h-none
        2xl:overflow-visible
        2xl:p-7
      "
    >
      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
            Thêm mới môn học
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Vui lòng cung cấp đầy đủ thông tin để tạo môn học mới.
          </p>
        </div>

        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-2xl sm:flex">
          🎓
        </div>
      </div>

      {/* IMAGE */}
      <UploadSubjectImage onUploaded={setImageAvatar} />

      {/* BASIC INFO */}
      <SectionTitle
        icon={<BookOpen size={16} />}
        title="Thông tin cơ bản"
        color="text-emerald-500"
      />

      <div
        className="
          mt-4
          grid
          grid-cols-1
          gap-x-5
          gap-y-3

          lg:grid-cols-2

          2xl:grid-cols-3
        "
      >
        <FormInput
          label="Mã môn học *"
          placeholder="Nhập mã môn học"
          {...register("COURSE_CODE", {
            required: "Vui lòng nhập mã môn học",
          })}
          error={errors.COURSE_CODE?.message}
        />

        <FormInput
          label="Tên môn học Tiếng Việt *"
          placeholder="Nhập tên môn học"
          {...register("COURSE_NAME", {
            required: "Vui lòng nhập tên môn học",
          })}
          error={errors.COURSE_NAME?.message}
        />

        <FormInput
          label="Tên môn học Tiếng Anh"
          placeholder="Nhập tên môn học"
          {...register("COURSE_NAME_EN")}
        />

        {/* TEACHER */}
        <div className="flex flex-col">
          <label className="mb-1 h-5 text-sm font-bold text-slate-600">
            Gắn thẻ người dạy chính *
          </label>

          <select
            {...register("TEACHER_ID", {
              required: "Vui lòng chọn giảng viên",
            })}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              text-slate-600
              outline-none
              focus:border-emerald-400
            "
          >
            <option value="">Chọn giảng viên</option>

            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name} - {teacher.email}
              </option>
            ))}
          </select>

          <div className="h-5">
            {errors.TEACHER_ID && (
              <p className="mt-1 text-xs text-red-500">
                {errors.TEACHER_ID.message}
              </p>
            )}
          </div>
        </div>

        {/* STUDY UNIT */}
        <FormInput
          label="Số đơn vị học tập *"
          placeholder="Nhập số ĐVHT"
          type="number"
          {...register("TOTAL_NUMBER_OF_STUDY_UNITS", {
            required: "Vui lòng nhập số ĐVHT",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Số ĐVHT phải lớn hơn 0",
            },
          })}
          error={errors.TOTAL_NUMBER_OF_STUDY_UNITS?.message}
        />

        {/* UNIT TYPE */}
        <div className="flex flex-col">
          <label className="mb-1 h-5 text-sm font-bold text-slate-600">
            Đơn vị học tập *
          </label>

          <select
            {...register("STUDY_UNIT_UOM_NAME", {
              required: "Vui lòng chọn đơn vị",
            })}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              text-slate-600
              outline-none
              focus:border-emerald-400
            "
          >
            <option value="credit">Tín chỉ</option>
            <option value="unit">Unit</option>
            <option value="period_class">Buổi học</option>
          </select>

          <div className="h-5">
            {errors.STUDY_UNIT_UOM_NAME && (
              <p className="mt-1 text-xs text-red-500">
                {errors.STUDY_UNIT_UOM_NAME.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* OUTCOME */}
      <div className="mt-5">
        <SectionTitle
          icon={<BookOpen size={16} />}
          title="Kết quả đầu ra của môn học"
          color="text-sky-500"
        />

        <div className="mt-3">
          <FormInput
            label="Kết quả đầu ra của môn học"
            placeholder="Nhập mô tả"
            {...register("OUTCOME_TEXT")}
          />
        </div>

        <button
          type="button"
          className="mt-2 text-sm font-semibold text-sky-500"
        >
          + Thêm mô tả
        </button>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-5">
        <SectionTitle
          icon={<GraduationCap size={16} />}
          title="Mô tả môn học"
          color="text-violet-500"
        />

        <textarea
          placeholder="Nhập mô tả môn học"
          {...register("DESCRIPTION")}
          className="
            mt-3
            h-24
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            text-sm
            outline-none
            placeholder:text-slate-400
            focus:border-emerald-400
          "
        />
      </div>

      {/* BUTTON */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="
            rounded-xl
            border
            border-slate-200
            px-6
            py-2
            text-sm
            font-semibold
            text-slate-500
          "
        >
          Hủy bỏ
        </button>

        <button
          type="submit"
          className="
            rounded-xl
            bg-violet-600
            px-6
            py-2
            text-sm
            font-semibold
            text-white
          "
        >
          Tiếp tục →
        </button>
      </div>
    </form>
  );
}