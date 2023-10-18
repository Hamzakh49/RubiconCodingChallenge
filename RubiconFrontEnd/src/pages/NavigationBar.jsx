import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTable, emptyTable } from "../redux/reducers/tableSlice";
import { getProjects } from "../api/projectsAPI";
import { getTasks } from "../api/taskAPI";

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  // const [tableData, setTableData] = useState([]);

  const handleSetTable = (data) => {
    dispatch(setTable(data));
  };
  const handleEmptyTable = () => {
    dispatch(emptyTable());
  };

  const getProjectsFunc = async () => {
    try {
      const res = await getProjects();
      if (res.data.success) {
        // settableData(res.data.data);
        handleSetTable(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTasksFunc = async () => {
    try {
      const res = await getTasks();
      if (res.data.success) {
        // settableData(res.data.data);
        handleSetTable(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (activeTab === "projects") {
      getProjectsFunc();
    } else {
      getTasksFunc();
    }
  }, [activeTab]);

  const tabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "projects") {
      navigate("/");
    } else {
      navigate("/tasks");
    }
  };
  console.log("tableData", tableData);
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
