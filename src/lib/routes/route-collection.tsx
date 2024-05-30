import LoginPage from "@/pages/login-page/login-page";
import HomePage from "../../pages/home-page/home-page";
import { MdDashboard } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { BsJournals } from "react-icons/bs";
import TimerPage from "@/pages/timer-page/timer-page";
import JournalPage from "@/pages/journal-page/journal-page";
import ProfilePage from "@/pages/profile-page/profile-page";

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
        element: <TimerPage />,
        icon: <IoTimerOutline />,
        showInSidebar: true,
    },
    {
        name: "Journal",
        route: "/journal",
        element: <JournalPage />,
        icon: <BsJournals />,
        showInSidebar: true
    },
    {
        name: "Daily Journal Detail",
        route: "/journal/daily/:id",
        element: <JournalPage />,
    },
    {
        name: "Weekly Journal Detail",
        route: "/journal/weekly/:id",
        element: <JournalPage />,
    },
    {
        name: "Profile",
        route: "/profile",
        element: <ProfilePage />,
    }
]

