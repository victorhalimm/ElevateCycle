import Header from "../header/header";
import { Button } from "../ui/button";
import DarkLogo from '../../assets/dark-logo.png';
import { Image } from "lucide-react";
import ImageContainer from "../image/image";

const Sidebar = () => {
    return (
        <div className="max-w-[40vh] flex flex-col gap-2 h-screen bg-slate-950 py-4 px-4 min-h-screen">
            <div className="flex items-center">
                <ImageContainer src={DarkLogo} />
                <Header>ElevateCycle</Header>
            </div>

        </div>
    )
}

export default Sidebar;