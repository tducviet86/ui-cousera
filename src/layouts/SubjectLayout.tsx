import TopBar from "@/components/Subject/Topbar/TopBar";
import Sidebar from "@/components/Subject/Sidebar/Sidebar";
import Header from "@/components/Subject/Header/Header";

type Props = {
  children: React.ReactNode;
};

const SubjectLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#f3f3f3">
      <Header />
      <div className="min-h-screen flex  bg-[#f3f3f3] ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 p-6">
            <div className="h-full bg-[#f0f0f0] rounded-lg  text-gray-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default SubjectLayout;
