import { Icons } from "@/components/icons";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between bg-[#F3F3F3] overflow-y-hidden">
      <div className="flex-col bg-[#F3F3F3] p-0 mt-[130px] items-start ml-[130px] h-full self-start mr-10  ">
        <div className="flex justify-center mb-5  ">
          <div className="flex  justify-center ">
            <Icons.StickyNote />
          </div>
        </div>
        {children}
      </div>
      <div className="w-[80%]  bg-[#F3F3F3] h-[100vh] mr-0 justify-center flex align-middle ">
        <Icons.chefLogo />
      </div>
    </div>
  );
};

export default AuthLayout;
