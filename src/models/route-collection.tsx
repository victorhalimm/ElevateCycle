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
    }
]

