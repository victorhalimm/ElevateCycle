import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/side-bar/sidebar";
import IChildren from "@/interfaces/children";
import { useState } from "react";

export default function MainTemplate({children} : IChildren /* ILoveChildren */) {

  const [sidebarClass, setSidebarClass] = useState("w-0");

  const openSidebar = () => sidebarClass === "w-0" ? setSidebarClass("w-[20vw]") : setSidebarClass("w-0");

  return (
    <div className="flex w-screen h-screen">
      <Sidebar className={sidebarClass} openSidebar={openSidebar}/>
      <div className="bg-[#101015] flex flex-col h-screen w-screen">
        <Navbar openSidebar={openSidebar}/>
        {children}
      </div>
    </div>
  );
}