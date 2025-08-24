import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";

export default async function BoardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="flex justify-between  max-w-screen-md mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="px-2 sm:p-4">
        <LeftBar />
      </div>
      <div className="px-2 flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray">
        {children}
        {modal}
      </div>
      <div className="px-2 hidden lg:flex ml-4 md:ml-8 flex-1">
        <RightBar />
      </div>
    </main>
  );
}
