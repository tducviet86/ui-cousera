import { ArrowLeft } from "lucide-react";

const steps = [
  ["1", "Thông tin", "Cung cấp thông tin cơ bản"],
  ["2", "Chi tiết", "Mô tả chi tiết môn học"],
  ["3", "Phí môn học", "Thiết lập học phí"],
  ["4", "Điểm chuyên cần", "Quy định chuyên cần"],
];

type Props = {
  currentStep: number;
  onBack?: () => void;
};

export default function CreateSubjectSidebar({ currentStep, onBack }: Props) {
  return (
    <aside className="relative h-full overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="p-5">
        <button
          type="button"
          onClick={onBack}
          disabled={currentStep === 1}
          className="flex items-center gap-2 text-sm text-slate-500 poin disabled:opacity-40"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {steps.map(([step, title, desc]) => {
          const stepNumber = Number(step);
          const active = stepNumber === currentStep;
          const completed = stepNumber < currentStep;

          return (
            <div
              key={step}
              className={`mx-2 flex cursor-default items-start gap-3 rounded-lg px-4 py-3 ${
                active ? "bg-emerald-50" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  active || completed
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {completed ? "✓" : step}
              </div>

              <div>
                <h4
                  className={`text-sm font-semibold ${
                    active ? "text-emerald-600" : "text-slate-600"
                  }`}
                >
                  {title}
                </h4>
                <p className="mt-1 text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-5xl">
        📚
      </div>
    </aside>
  );
}