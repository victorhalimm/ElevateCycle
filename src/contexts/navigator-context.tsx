import IChildren from "@/lib/types/children";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavigatorContext = createContext(async (route : string) => {});

export default function NavigatorContextProvider({children} : IChildren) {

    const nav = useNavigate();
    const [transitionIndex, setTransitionIndex] = useState<0 | 1 | 2 | 3>(0);

    const navigate = async (route : string) => {

        if(transitionIndex !== 0) return

        setTransitionIndex(1);
        await new Promise((resolve) => setTimeout(resolve, 300));
        nav(route);
        await new Promise((resolve) => setTimeout(resolve, 100));
        setTransitionIndex(2);
        await new Promise((resolve) => setTimeout(resolve, 700));
        setTransitionIndex(3);
        await new Promise((resolve) => setTimeout(resolve, 5));
        setTransitionIndex(0);
    }

    return (
        <NavigatorContext.Provider value={navigate}>
            <div 
                className={`fixed z-[15] left-[-10vw] w-[10vw] h-screen bg-pageBlack transition-all duration-500 ${transitionIndex === 3 ? "hidden" : ""}`}
                style={{transform: transitionIndex === 1 ? "scaleX(30)" : transitionIndex === 2 ? "translateX(110vw)" : "scaleX(0) translateX(0)"}}
            >
            </div>
            {children}
        </NavigatorContext.Provider>
    )
}

export const useNavigator = () => useContext(NavigatorContext)