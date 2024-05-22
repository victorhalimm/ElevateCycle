import IChildren from "@/interfaces/children";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavigatorContext = createContext(async (route : string) => {});

export default function NavigatorContextProvider({children} : IChildren) {

    const nav = useNavigate();
    const [showTransition, setShowTransition] = useState(false);

    const navigate = async (route : string) => {
        setShowTransition(true);
        await new Promise((resolve) => setTimeout(resolve, 400));
        nav(route);
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShowTransition(false);
    }

    return (
        <NavigatorContext.Provider value={navigate}>
            <div 
                className={`fixed z-50 left-[-10vw] w-[10vw] h-screen bg-darkBlue transition-all duration-700`}
                style={{transform: showTransition ? "scaleX(30)" : "scaleX(0)"}}
            >
            </div>
            {children}
        </NavigatorContext.Provider>
    )
}

export const useNavigator = () => useContext(NavigatorContext)