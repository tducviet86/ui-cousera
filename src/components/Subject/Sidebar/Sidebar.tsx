"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Database,
  Video,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

const Sidebar = () => {
  const [openQuestionBank, setOpenQuestionBank] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-lg px-4 py-6">
      <nav className="space-y-1 text-sm">
        <MenuItem
          label="Trang chủ"
          Icon={Home}
          href="/"
          active={pathname === "/"}
        />

        <div>
          <button
            type="button"
            onClick={() => setOpenQuestionBank(!openQuestionBank)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <Database size={18} />
              <span>Ngân hàng câu hỏi</span>
            </div>

            <ChevronDown
              size={20}
              className={`transition-transform ${
                openQuestionBank ? "rotate-180" : ""
              }`}
            />
          </button>

          {openQuestionBank && (
            <div className="ml-8 mt-1 space-y-1">
              <SubMenuItem
                label="Quản lý Thư mục"
                href="/mon-hoc/thu-muc"
                active={pathname === "/mon-hoc/thu-muc"}
              />
              <SubMenuItem
                label="Quản lý Bài tập"
                href="/mon-hoc/bai-tap"
                active={pathname === "/mon-hoc/bai-tap"}
              />
              <SubMenuItem
                label="Quản lý Môn học"
                href="/mon-hoc/quan-ly-mon-hoc"
                active={pathname === "/mon-hoc/quan-ly-mon-hoc"}
              />
            </div>
          )}
        </div>

        <MenuItem
          label="Video của tôi"
          Icon={Video}
          href="/video"
          active={pathname.startsWith("/video")}
        />
      </nav>
    </aside>
  );
};

type MenuItemProps = {
  label: string;
  Icon: LucideIcon;
  href: string;
  active?: boolean;
};

const MenuItem = ({ label, Icon, href, active }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
        ${
          active
            ? "bg-purple-100 text-purple-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
};

type SubMenuItemProps = {
  label: string;
  href: string;
  active?: boolean;
};

const SubMenuItem = ({ label, href, active }: SubMenuItemProps) => {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg cursor-pointer
        ${
          active
            ? "bg-purple-100 text-purple-600 font-medium"
            : "hover:bg-gray-100 text-gray-600"
        }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;