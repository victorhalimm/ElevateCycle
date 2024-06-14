import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/side-bar/sidebar";
import IChildren from "@/lib/types/children";
import { useState } from "react";

export default function MainTemplate({children} : IChildren /* ILoveChildren */) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar className={sidebarOpen ? "w-[20vw]" : "w-0"} openSidebar={() => setSidebarOpen(!sidebarOpen)}/>
      <div className="bg-[#101015] flex flex-col h-screen w-screen overflow-x-hidden">
        <Navbar openSidebar={() => setSidebarOpen(!sidebarOpen)}/>
        {children}
      </div>
    </div>
  );
}