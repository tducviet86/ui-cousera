import { ChevronDown } from "lucide-react";

export default function FormSelect({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 block h-5 text-sm font-bold leading-5 text-slate-600">
        {label || "\u00A0"}
      </label>

      <button
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 px-4 text-sm text-slate-600"
      >
        {value}
        <ChevronDown size={16} />
      </button>

      <div className="h-5" />
    </div>
  );
}