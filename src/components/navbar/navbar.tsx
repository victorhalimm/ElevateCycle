import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CgLayoutGridSmall } from "react-icons/cg";

export default function Navbar({openSidebar} : any) {
    return (
        <div className="w-full h-24 flex items-center justify-between z-10 bg-[#101015]">
            <CgLayoutGridSmall 
                className="text-slate-300 text-5xl ml-3 transition-all hover:text-white cursor-pointer absolute left-0 -z-10"
                onClick={openSidebar}
            />
            <div></div>
            <div className="text-white flex items-center mr-8">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <p className="font-chakra text-sm">Ramadhan</p>
                    <p className="font-chakra text-xs opacity-40">Effenduck</p>
                </div>
            </div>
        </div>
    );
}

type params = {
    openSidebar : () => void
}