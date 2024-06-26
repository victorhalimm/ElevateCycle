import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import NavigatorContextProvider from "./contexts/navigator-context";
import UserContextProvider from "./contexts/user-context";
import { routeCollection } from "./lib/routes/route-collection";
import { TimerProvider } from "./contexts/timer-context";
import './App.css';

function App() {

  return (
    <>
    <Router>
        <NavigatorContextProvider>
            <UserContextProvider>
                <TimerProvider>
                    <Routes>
                        {routeCollection.map((route) => {
                            return <Route element={route.element} path={route.route} />;
                        })}
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </TimerProvider>
            </UserContextProvider>
        </NavigatorContextProvider>
        <Toaster />
    </Router>
    </>
  );
}

export default App;
