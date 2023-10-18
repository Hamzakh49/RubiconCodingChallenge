import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./layouts/NavigationBar";
import { Projects } from "./pages/Projects";
import { Tasks } from "./pages/Tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
