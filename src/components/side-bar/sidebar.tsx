import Header from "../header/header";
import { Button } from "../ui/button";
import DarkLogo from '../../assets/dark-logo.png';
import { Image } from "lucide-react";
import ImageContainer from "../image/image";

const Sidebar = ({className, openSidebar} : params) => {
    return (
        <div className={`max-w-[40vh] h-screen bg-[#101015] overflow-hidden min-h-screen transition-all relative z-20 duration-500 ${className}`}>
            <div className="flex flex-col gap-2 mt-5 ml-4 absolute">
                <div className="flex items-center" onClick={openSidebar}>
                    <ImageContainer src={DarkLogo} />
                    <Header>ElevateCycle</Header>
                    
                </div>

            </div>
        </div>
    )
}

type params = {
    className : string
    openSidebar : () => void
}

export default Sidebar;