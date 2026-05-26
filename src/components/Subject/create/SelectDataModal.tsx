"use client";

import {
  BookOpen,
  Check,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

export type OptionItem = {
  _id: string;
  name?: string;
  COURSE_NAME?: string;
  FIELD_OF_STUDY_NAME?: string;
  FOS_NAME?: string;
  SKILL_NAME?: string;
  ACADEMIC_LEVEL_NAME?: string;
};

type Props = {
  title: string;
  desc: string;
  options: OptionItem[];
  selectedIds: string[];
  onClose: () => void;
  onToggle: (id: string) => void;
  onConfirm: () => void;
};

const getName = (item: OptionItem) => {
  return (
    item.name ||
    item.COURSE_NAME ||
    item.FIELD_OF_STUDY_NAME ||
    item.FOS_NAME ||
    item.SKILL_NAME ||
    item.ACADEMIC_LEVEL_NAME ||
    "Không có tên"
  );
};

export default function SelectDataModal({
  title,
  desc,
  options,
  selectedIds,
  onClose,
  onToggle,
  onConfirm,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      getName(item)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [options, search]);

  const selectedItems = options.filter((item) =>
    selectedIds.includes(item._id)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-violet-100 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
        {/* HEADER */}
        <div className="flex items-start justify-between px-7 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
              <BookOpen size={24} />
            </div>

            <div>
              <h2 className="text-[22px] font-bold text-slate-800">
                {title}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {desc}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-7">
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
            <Search
              size={19}
              className="text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={`Tìm kiếm ${title.toLowerCase()}...`}
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

            <div className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-400">
              ⌘ K
            </div>
          </div>
        </div>

        {/* TOP */}
        <div className="mt-6 flex items-center justify-between px-7">
          <h3 className="text-sm font-bold text-slate-700">
            Tất cả dữ liệu
          </h3>

          <span className="text-sm font-bold text-violet-500">
            Đã chọn ({selectedIds.length})
          </span>
        </div>

        {/* BODY */}
        <div className="mt-4 grid flex-1 grid-cols-1 gap-3 overflow-y-auto px-7 pb-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredOptions.map((item) => {
            const active = selectedIds.includes(item._id);

            return (
              <button
                key={item._id}
                type="button"
                onClick={() => onToggle(item._id)}
                className={`
          relative flex h-[58px] items-center justify-between
          rounded-xl border px-3 text-left transition-all
          ${active
                    ? "border-violet-300 bg-violet-50"
                    : "border-slate-200 bg-white hover:border-violet-200"
                  }
        `}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`
              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
              ${active
                        ? "bg-violet-100 text-violet-500"
                        : "bg-violet-50 text-violet-400"
                      }
            `}
                  >
                    <BookOpen size={14} />
                  </div>

                  <span
                    className={`
              line-clamp-1 text-[12px] font-semibold
              ${active ? "text-violet-700" : "text-slate-700"}
            `}
                  >
                    {getName(item)}
                  </span>
                </div>

                {active && (
                  <div className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white">
                    <Check size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-100 px-7 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              Đã chọn ({selectedIds.length})
            </span>

            {selectedItems.length > 0 &&
              selectedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600"
                >
                  {getName(item)}

                  <button
                    type="button"
                    onClick={() =>
                      onToggle(item._id)
                    }
                    className="text-violet-400 hover:text-red-500"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="rounded-2xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { getName };