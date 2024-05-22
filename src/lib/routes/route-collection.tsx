import LoginPage from "@/pages/login-page/login-page";
import HomePage from "../../pages/home-page/home-page";
import { MdDashboard } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";

interface IRoute {
    name: string;
    element: JSX.Element;
    route: string;
    icon?: JSX.Element;
    showInSidebar?: boolean;
}

export const routeCollection : IRoute[] = [
    {
        name: "Dashboard",
        route: "/home",
        element: <HomePage />,
        icon: <MdDashboard />,
        showInSidebar: true
    },
    {
        name: "Login",
        route: "/login",
        element: <LoginPage />
    },
    {
        name: "Timer",
        route: "/timer",
        element: <></>,
        icon: <IoTimerOutline />,
        showInSidebar: true,
    }
]

