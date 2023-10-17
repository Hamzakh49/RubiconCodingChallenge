import { useState } from "react";
import { Button } from "reactstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  const tabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "projects") {
      navigate("/");
    } else {
      navigate("/tasks");
    }
  };
  return (
    <>
      {/* <div className="title">Rubicon Coding Challenge</div> */}
      <Button
        onClick={() => tabClick("projects")}
        className={`${
          activeTab === "projects" ? "active-tab " : "inactive-tab"
        }`}
      >
        Projects
      </Button>
      <Button
        onClick={() => tabClick("tasks")}
        className={`${
          activeTab === "tasks" ? "active-tab " : "inactive-tab"
        } tasks-button`}
      >
        Tasks
      </Button>
      <Outlet />
    </>
  );
};
