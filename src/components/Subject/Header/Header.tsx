import Image from "next/image";
import logo from "../../../public/images/logo.png";
const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9  rounded-full flex items-center justify-center text-white font-bold">
            <Image src={logo} alt="Logo" width={32} height={32} />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-[#665FFF] text-lg">Click-Ed</div>
            <div className="text-xs text-gray-500">MASTER OF Q&A</div>
          </div>
        </div>

       

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              9
            </span>
          </div>

          <div className="relative cursor-pointer">
            <span className="text-xl">💬</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              9
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-gray-300 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;