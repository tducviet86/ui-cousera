import Image from "next/image";
import img1 from "../../../public/images/img1.jpg";
import {
  Users,
  CircleCheckBig,
  FileUp,
  ChevronDown,
  Star,
  Ellipsis,
} from "lucide-react";
const dataSubject = [
  {
    id: 1,
    name: "CS202-Cấu trúc dữ liệu và giới thiệu cá...",
    credits: 4,
    lessons: 7,
    level: "Đại học",
    rating: 4.0,
    reviews: 89,
    students: 95,
    completionRate: "75%",
  },
  // Thêm các môn học khác nếu cần
  
];
const ManagementSubject = () => {
  return (
    <div className=" bg-gray-100">
      <div className="w-110 p-3 flex  gap-4 rounded-lg bg-white border-b border-gray-200">
        <div className="">
          <Image
            src={img1}
            alt="Logo"
            width={102}
            height={116}
            className="rounded-2xl"
          />
        </div>
        <div className="flex-1 ">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3 ">
              <div className="flex items-center text-lg font-normal text-gray-800">
                <Users size={20} className="mr-1" />
                95
              </div>
              <div className="flex items-center text-lg font-normal text-gray-800">
                <CircleCheckBig size={20} className="mr-1" />
                75%
              </div>
            </div>
            <div className="text-lg  text-gray-800">
              <button className="flex items-center px-2 py-1 bg-blue-600 text-white text-normal rounded-lg hover:bg-blue-700">
                <FileUp size={20} className="mr-2" />
                Sẵn sàng
                <ChevronDown size={20} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            <h3>CS202-Cấu trúc dữ liệu và giới thiệu cá...</h3>
          </div>
          <div className="flex mt-2 text-gray-600 gap-2 ">
            <p className="text-sm">4 tín chỉ |</p>
            <p className="text-sm">7 bài học |</p>
            <p className="text-sm">Đại học</p>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-sm text-gray-500">
              <span className="flex items-center gap-1 text-black">
                <Star size={20} color="yellow" />
                4.0 (89)
              </span>
            </p>
            <button className="p-2 rounded-full">
              <Ellipsis size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagementSubject;
