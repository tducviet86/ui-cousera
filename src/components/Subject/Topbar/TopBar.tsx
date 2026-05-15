"use client";
import CreateSubjectPage from "@/app/mon-hoc/tao-mon-hoc/page";
import { FilePlusCorner, X } from "lucide-react";
import { useState, useEffect } from "react";
const TopBar = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <header className="h-40 bg-white border-b border-gray-200 px-6 text-[#000000b9]  ">
        <div className="flex justify-between items-center gap-4 mt-4">
          <h2 className="text-lg font-semibold">Quản Lý Môn Học</h2>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <FilePlusCorner size={18} />
            Tạo Môn Học
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-sm font-semibold">Môn Học</h3>
          <span className="text-sm font-semibold">Tổng số môn học : 0</span>
        </div>
        <div className="flex items-center justify-end mt-2 gap-4">
          <div className="flex-1 max-w-xl relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100
                 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              className="px-4 py-2 rounded-xl bg-gray-100 text-sm
                 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option>Theo ngày tạo</option>
              <option>Theo tên</option>
            </select>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative h-[96vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-cyan-50 p-3 shadow-xl">


            <CreateSubjectPage />
          </div>
        </div>
      )}
    </>
  )
};
export default TopBar;
