import {
  BookOpen,
  Brain,
  GraduationCap,
  Layers,
  PlusCircle,
  Shuffle,
  Target,
} from "lucide-react";

const sections = [
  {
    title: "Lĩnh vực",
    desc: "Chọn lĩnh vực phù hợp với môn học",
    icon: <BookOpen size={16} />,
    color: "violet",
    button: "Thêm lĩnh vực",
    tags: ["Công nghệ thông tin"],
  },
  {
    title: "Kỹ năng",
    desc: "Chọn các kỹ năng liên quan đến môn học",
    icon: <Brain size={16} />,
    color: "emerald",
    button: "Thêm kỹ năng",
    tags: ["Lập trình Python", "Cơ sở dữ liệu", "Giải quyết vấn đề"],
  },
  {
    title: "Bậc học",
    desc: "Chọn bậc học phù hợp",
    icon: <GraduationCap size={16} />,
    color: "orange",
    button: "Thêm Bậc học",
    tags: ["Đại học"],
  },
  {
    title: "Môn học tiên quyết",
    desc: "Chọn môn học là điều kiện tiên quyết nếu có",
    icon: <Target size={16} />,
    color: "sky",
    button: "Thêm môn học",
    tags: ["Nhập môn lập trình", "Cấu trúc dữ liệu và giải thuật"],
  },
  {
    title: "Môn học song hành",
    desc: "Chọn môn học học song hành nếu có",
    icon: <Shuffle size={16} />,
    color: "pink",
    button: "Thêm môn học",
    tags: ["Phát triển ứng dụng Web", "Lập trình hướng đối tượng"],
  },
];

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

export const CreateDetailSubject = () => {
  return (
    <main className="flex h-full flex-col rounded-2xl bg-white px-7 py-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800">
            Thêm mới môn học
          </h1>
          <p className="mt-1 text-[11px] text-slate-500">
            Vui lòng cung cấp thông tin chi tiết để hoàn thiện môn học.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-xl">
          🎓
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((item) => {
          const c = colorMap[item.color];

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.box}`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700">
                      {item.title} <span className="text-red-400">*</span>
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[11px] font-semibold ${c.btn}`}
                >
                  <PlusCircle size={13} />
                  {item.button}
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-[11px] font-semibold ${c.tag}`}
                  >
                    {tag}
                    <button type="button" className="text-slate-400">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end gap-3 pt-3">
        <button className="rounded-xl border px-6 py-2 text-xs font-semibold text-slate-500">
          Hủy bỏ
        </button>
        <button className="rounded-xl bg-violet-600 px-6 py-2 text-xs font-semibold text-white">
          Tiếp tục →
        </button>
      </div>
    </main>
  );
};