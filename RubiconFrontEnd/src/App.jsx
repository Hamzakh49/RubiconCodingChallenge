import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./pages/NavigationBar";
import { Projects } from "./pages/Projects";
import { Tasks } from "./pages/Tasks";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<NavigationBar />}>
            <Route path="/" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
