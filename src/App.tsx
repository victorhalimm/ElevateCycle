import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import { routeCollection } from "./models/route-collection";
import MainTemplate from "./templates/main-template";

function App() {

  return (
    <>
    <MainTemplate>
      <Router>
        <Routes>
          {routeCollection.map((route) => {
            return <Route element={route.element} path={route.route} />;
          })}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </MainTemplate>
    </>
  );
}

export default App;
