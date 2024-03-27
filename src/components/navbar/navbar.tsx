import { CgLayoutGridSmall } from "react-icons/cg";
import UserDropdown from "../user-dropdown/user-dropdown";

export default function Navbar({openSidebar} : any) {
    return (
        <div className="w-full h-24 flex items-center justify-between z-10 bg-[#101015]">
            <CgLayoutGridSmall 
                className="text-slate-300 text-5xl ml-3 transition-all hover:text-white cursor-pointer absolute left-0 -z-10"
                onClick={openSidebar}
            />
            <div></div>
            <UserDropdown />
        </div>
    );
}
