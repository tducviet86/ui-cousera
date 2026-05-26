"use client";

import {
  BookOpen,
  Brain,
  GraduationCap,
  Shuffle,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  loadAcademicLevelApi,
  loadCourseByUserApi,
  loadFieldOfStudyApi,
  loadSkillApi,
} from "@/services/subject.service";

import SelectDataModal, {
  OptionItem,
  getName,
} from "@/components/Subject/create/SelectDataModal";

export type CreateSubjectStep2Data = {
  LIST_SKILL_ID: string[];
  LIST_ACADEMIC_LEVEL_ID: string[];
  LIST_COURSE_PREREQUISITE_ID: string[];
  LIST_COURSE_PARALLEL_ID: string[];
  LIST_FIELD_OF_STUDY_ID: string[];
};

type Props = {
  defaultValues?: Partial<CreateSubjectStep2Data>;
  onBack?: () => void;
  onNext: (data: CreateSubjectStep2Data) => void;
  userId?: string;
};

type ModalType = "field" | "skill" | "level" | "prerequisite" | "parallel";

const DEFAULT_USER_ID = "69e0439a748ae19c336b2b23";

const colorMap: Record<string, any> = {
  violet: {
    box: "bg-violet-50 text-violet-500",
    btn: "border-violet-400 text-violet-500",
    tag: "bg-violet-50 text-violet-600",
  },
  emerald: {
    box: "bg-emerald-50 text-emerald-500",
    btn: "border-emerald-400 text-emerald-500",
    tag: "bg-emerald-50 text-emerald-600",
  },
  orange: {
    box: "bg-orange-50 text-orange-500",
    btn: "border-orange-400 text-orange-500",
    tag: "bg-orange-50 text-orange-600",
  },
  sky: {
    box: "bg-sky-50 text-sky-500",
    btn: "border-sky-400 text-sky-500",
    tag: "bg-sky-50 text-sky-600",
  },
  pink: {
    box: "bg-pink-50 text-pink-500",
    btn: "border-pink-400 text-pink-500",
    tag: "bg-pink-50 text-pink-600",
  },
};

export const CreateDetailSubject = ({
  defaultValues,
  onBack,
  onNext,
  userId,
}: Props) => {
  const [fields, setFields] = useState<OptionItem[]>([]);
  const [skills, setSkills] = useState<OptionItem[]>([]);
  const [academicLevels, setAcademicLevels] = useState<OptionItem[]>([]);
  const [courses, setCourses] = useState<OptionItem[]>([]);

  const [fieldIds, setFieldIds] = useState<string[]>(
    defaultValues?.LIST_FIELD_OF_STUDY_ID || []
  );

  const [skillIds, setSkillIds] = useState<string[]>(
    defaultValues?.LIST_SKILL_ID || []
  );

  const [academicLevelIds, setAcademicLevelIds] = useState<string[]>(
    defaultValues?.LIST_ACADEMIC_LEVEL_ID || []
  );

  const [prerequisiteIds, setPrerequisiteIds] = useState<string[]>(
    defaultValues?.LIST_COURSE_PREREQUISITE_ID || []
  );

  const [parallelIds, setParallelIds] = useState<string[]>(
    defaultValues?.LIST_COURSE_PARALLEL_ID || []
  );

  const [loadingFields, setLoadingFields] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);

  const [modalType, setModalType] = useState<ModalType | null>(null);

  const fetchFields = async () => {
    try {
      setLoadingFields(true);

      const data = await loadFieldOfStudyApi();

      console.log("FIELDS RAW:", data);

      setFields(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Load fields error:", error);
      setFields([]);
    } finally {
      setLoadingFields(false);
    }
  };

  const fetchAcademicLevels = async () => {
    try {
      setLoadingLevels(true);

      const data = await loadAcademicLevelApi();

      console.log("ACADEMIC LEVEL RAW:", data);

      setAcademicLevels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Load academic levels error:", error);
      setAcademicLevels([]);
    } finally {
      setLoadingLevels(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);

      const currentUserId = userId || DEFAULT_USER_ID;

      const data = await loadCourseByUserApi(currentUserId);

      console.log("COURSES RAW:", data);

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Load courses error:", error);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchSkills = async () => {
    try {
      setLoadingSkills(true);

      const data = await loadSkillApi(fieldIds);

      console.log("SKILLS RAW:", data);

      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Load skills error:", error);
      setSkills([]);
    } finally {
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    fetchFields();
    fetchAcademicLevels();
    fetchCourses();
  }, [userId]);

  useEffect(() => {
    if (fieldIds.length > 0) {
      fetchSkills();
    } else {
      setSkills([]);
      setSkillIds([]);
    }
  }, [fieldIds]);

  const toggleItem = (
    id: string,
    selectedIds: string[],
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!id) return;

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getSelectedItems = (items: OptionItem[], ids: string[]) => {
    return items.filter((item) => ids.includes(item._id));
  };

  const handleNext = () => {
    if (fieldIds.length === 0) {
      alert("Vui lòng chọn ngành nghề");
      return;
    }

    if (academicLevelIds.length === 0) {
      alert("Vui lòng chọn bậc học");
      return;
    }

    onNext({
      LIST_SKILL_ID: skillIds,
      LIST_ACADEMIC_LEVEL_ID: academicLevelIds,
      LIST_COURSE_PREREQUISITE_ID: prerequisiteIds,
      LIST_COURSE_PARALLEL_ID: parallelIds,
      LIST_FIELD_OF_STUDY_ID: fieldIds,
    });
  };

  const sections = [
    {
      type: "field" as ModalType,
      title: "Ngành nghề",
      desc: "Chọn ngành nghề phù hợp với môn học",
      icon: <BookOpen size={16} />,
      color: "violet",
      button: loadingFields ? "Đang tải..." : "Thêm ngành nghề",
      required: true,
      options: fields,
      selectedIds: fieldIds,
      setSelectedIds: setFieldIds,
      disabled: loadingFields,
      emptyText: loadingFields ? "Đang tải ngành nghề..." : "Chưa chọn ngành nghề",
    },
    {
      type: "skill" as ModalType,
      title: "Kỹ năng",
      desc: "Chọn các kỹ năng liên quan đến ngành nghề",
      icon: <Brain size={16} />,
      color: "emerald",
      button: loadingSkills ? "Đang tải..." : "Thêm kỹ năng",
      required: false,
      options: skills,
      selectedIds: skillIds,
      setSelectedIds: setSkillIds,
      disabled: fieldIds.length === 0 || loadingSkills,
      emptyText:
        fieldIds.length === 0
          ? "Vui lòng chọn ngành nghề trước"
          : loadingSkills
          ? "Đang tải kỹ năng..."
          : "Chưa chọn kỹ năng",
    },
    {
      type: "level" as ModalType,
      title: "Bậc học",
      desc: "Chọn bậc học phù hợp",
      icon: <GraduationCap size={16} />,
      color: "orange",
      button: loadingLevels ? "Đang tải..." : "Thêm bậc học",
      required: true,
      options: academicLevels,
      selectedIds: academicLevelIds,
      setSelectedIds: setAcademicLevelIds,
      disabled: loadingLevels,
      emptyText: loadingLevels ? "Đang tải bậc học..." : "Chưa chọn bậc học",
    },
    {
      type: "prerequisite" as ModalType,
      title: "Môn học tiên quyết",
      desc: "Chọn môn học là điều kiện tiên quyết nếu có",
      icon: <Target size={16} />,
      color: "sky",
      button: loadingCourses ? "Đang tải..." : "Thêm môn học",
      required: false,
      options: courses,
      selectedIds: prerequisiteIds,
      setSelectedIds: setPrerequisiteIds,
      disabled: loadingCourses,
      emptyText: loadingCourses ? "Đang tải môn học..." : "Chưa chọn môn học",
    },
    {
      type: "parallel" as ModalType,
      title: "Môn học song hành",
      desc: "Chọn môn học song hành nếu có",
      icon: <Shuffle size={16} />,
      color: "pink",
      button: loadingCourses ? "Đang tải..." : "Thêm môn học",
      required: false,
      options: courses,
      selectedIds: parallelIds,
      setSelectedIds: setParallelIds,
      disabled: loadingCourses,
      emptyText: loadingCourses ? "Đang tải môn học..." : "Chưa chọn môn học",
    },
  ];

  const activeSection = sections.find((item) => item.type === modalType);

  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto lg:p-6 2xl:max-h-none 2xl:overflow-visible 2xl:p-7">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Thêm mới môn học
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Vui lòng cung cấp thông tin chi tiết để hoàn thiện môn học.
            </p>
          </div>

          <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-xl sm:flex">
            🎓
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((item) => {
            const c = colorMap[item.color];
            const selectedItems = getSelectedItems(
              item.options,
              item.selectedIds
            );

            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.box}`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-700">
                        {item.title}
                        {item.required && (
                          <span className="ml-1 text-red-400">*</span>
                        )}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => setModalType(item.type)}
                    className={`rounded-lg border px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${c.btn}`}
                  >
                    {item.button}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedItems.length > 0 ? (
                    selectedItems.map((tag) => (
                      <span
                        key={tag._id}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold ${c.tag}`}
                      >
                        {getName(tag)}

                        <button
                          type="button"
                          onClick={() =>
                            toggleItem(
                              tag._id,
                              item.selectedIds,
                              item.setSelectedIds
                            )
                          }
                          className="text-slate-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">
                      {item.emptyText}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-500"
          >
            Quay lại
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-violet-600 px-6 py-2 text-sm font-semibold text-white"
          >
            Tiếp tục →
          </button>
        </div>
      </main>

      {activeSection && (
        <SelectDataModal
          title={`Thêm ${activeSection.title.toLowerCase()}`}
          desc={activeSection.desc}
          options={activeSection.options}
          selectedIds={activeSection.selectedIds}
          onClose={() => setModalType(null)}
          onToggle={(id) =>
            toggleItem(
              id,
              activeSection.selectedIds,
              activeSection.setSelectedIds
            )
          }
          onConfirm={() => setModalType(null)}
        />
      )}
    </>
  );
};