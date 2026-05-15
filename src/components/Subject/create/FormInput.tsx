import { InputHTMLAttributes } from "react";

type FormInputProps = {
  label: string;
  placeholder: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  placeholder,
  error,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 block h-5 text-sm font-bold leading-5 text-slate-600">
        {label}
      </label>

      <input
        placeholder={placeholder}
        {...props}
        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none placeholder:text-slate-300 focus:border-emerald-400"
      />

      <div className="h-5">
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}