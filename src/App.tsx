import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import NavigatorContextProvider from "./contexts/navigator-context";
import { routeCollection } from "./models/route-collection";
import MainTemplate from "./templates/main-template";

function App() {

  return (
    <>
    <Router>
        <NavigatorContextProvider>
            <Routes>
                {routeCollection.map((route) => {
                    return <Route element={route.element} path={route.route} />;
                })}
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </NavigatorContextProvider>
    </Router>
    </>
  );
}

export default App;
