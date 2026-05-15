import Image from "next/image";
import imgLogin from "../../public/images/dangnhap.jpg";
import logo from "../../public/images/logo.png";
import google from "../../public/images/gg.png";
import facebook from "../../public/images/fb.png";
import apple from "../../public/images/apple1.png";

const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%_60%] min-h-screen">
      <div className="hidden md:flex bg-[#EEF0FF] items-center justify-center">
        <Image
          src={imgLogin}
          alt="Login Image"
          className="max-w-[80%] h-auto"
          priority
        />
      </div>

      <div className="bg-white flex flex-col items-center">
        <div className="mt-12 flex items-center gap-3">
          <Image src={logo} alt="Logo" className="w-13 h-auto" />
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">Click QA</div>
            <div className="text-sm text-black font-medium">MASTER OF Q<span className="text-[10px]">&</span>A</div>
          </div>
        </div>

        <div className="mt-10 w-full max-w-sm px-4">
          <h1 className="text-2xl font-semibold mb-2 text-center">Đăng nhập</h1>

          <p className="text-gray-400 text-sm text-center mt-3">
            Vui lòng đăng nhập để tiếp tục vào <br />
            tài khoản của bạn
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="clickqa@gmail.com"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="••••••••"
                
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex mx-1 items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Ghi nhớ đăng nhập
              </label>

              <a href="#" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-medium py-2 rounded-lg transition"
            >
              Đăng nhập
            </button>

            <div className="flex items-center my-6">
              <div className="grow border-t border-gray-300" />
              <span className="mx-3 text-sm text-gray-500">
                Hoặc đăng nhập với
              </span>
              <div className="grow border-t border-gray-300" />
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="w-12 h-12 border border-gray-300 hover:bg-gray-100
               rounded-full transition
               flex items-center justify-center"
              >
                <Image src={google} alt="Google Logo" width={20} height={20} />
              </button>

              <button
                className="w-12 h-12 border border-gray-300 hover:bg-gray-100
               rounded-full transition
               flex items-center justify-center"
              >
                <Image
                  src={facebook}
                  alt="Facebook Logo"
                  width={20}
                  height={20}
                />
              </button>

              <button
                className="w-12 h-12 border border-gray-300 hover:bg-gray-100
               rounded-full transition
               flex items-center justify-center"
              >
                <Image src={apple} alt="Apple Logo" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
