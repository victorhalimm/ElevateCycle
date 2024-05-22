import Header from "../header/header";
import DarkLogo from '../../assets/dark-logo.png';
import ImageContainer from "../image/image";
import { routeCollection } from "@/models/route-collection";
import { useLocation } from "react-router-dom";
import { useNavigator } from "@/contexts/navigator-context";

const Sidebar = ({className, openSidebar} : params) => {

    const currentRoute = useLocation();
    const navigate = useNavigator();

    return (
        <div className={`max-w-[40vh] h-screen bg-[#101015] overflow-hidden min-h-screen transition-all relative z-20 duration-500 ${className}`}>
            <div className="flex flex-col gap-2 mt-5 ml-4 absolute h-24">
                <div className="flex items-center cursor-pointer" onClick={openSidebar}>
                    <ImageContainer src={DarkLogo} />
                    <Header>ElevateCycle</Header>
                </div>

                <div className="flex flex-col gap-6 mt-8 font-chakra">
                {
                    routeCollection.map((route, index) => (
                        route.showInSidebar ? (
                            <div 
                                className={`text-lg flex items-center gap-3 transition-all duration-200 cursor-pointer 
                                    ${currentRoute?.pathname === route.route ? " text-lighterBlue" : "text-darkCream opacity-60 hover:opacity-100"}`} key={index}
                                onClick={() => navigate(route.route)}
                            >
                                {route.icon}
                                {route.name}
                            </div>
                        ) : <></>
                    ))
                }    
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