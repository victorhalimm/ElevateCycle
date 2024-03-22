import LoginPage from "@/pages/login-page/login-page";
import HomePage from "../pages/home-page/home-page";

interface IRoute {
    name: string;
    element: JSX.Element;
    route: string;
}

export const routeCollection : IRoute[] = [
    {
        name: "Home",
        route: "/home",
        element: <HomePage />
    },
    {
        name: "Login",
        route: "/login",
        element: <LoginPage />
    },
]

