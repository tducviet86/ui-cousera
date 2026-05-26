"use client";

import { usePathname, useRouter } from "next/navigation";
import { FilePlusCorner } from "lucide-react";

import CreateSubjectPage from "@/app/mon-hoc/tao-mon-hoc/page";

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === "/mon-hoc/tao-mon-hoc";

  return (
    <>
      {!isCreatePage && (
        <header className="h-40 border-b border-gray-200 bg-white px-6 text-[#000000b9]">
          <div className="mt-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">
              Quản Lý Môn Học
            </h2>

            <button
              onClick={() => router.push("/mon-hoc/tao-mon-hoc")}
              className="
                flex items-center gap-2 rounded-lg
                bg-gray-200 px-4 py-2
                text-blue-600
                hover:bg-blue-600
                hover:text-white
              "
            >
              <FilePlusCorner size={18} />
              Tạo Môn Học
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Môn Học</h3>

            <span className="text-sm font-semibold">
              Tổng số môn học : 0
            </span>
          </div>

          <div className="mt-2 flex items-center justify-end gap-4">
            <div className="relative max-w-xl flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Tìm kiếm"
                className="
                  w-full rounded-xl bg-gray-100
                  py-2 pl-10 pr-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-400
                "
              />
            </div>

            <div className="flex items-center gap-4">
              <select
                className="
                  rounded-xl bg-gray-100
                  px-4 py-2 text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-400
                "
              >
                <option>Theo ngày tạo</option>
                <option>Theo tên</option>
              </select>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default TopBar;

