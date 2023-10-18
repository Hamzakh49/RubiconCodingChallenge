import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { CiCalendar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalComponent } from "../components/ModalComponent";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { AiFillFlag } from "react-icons/ai";
import { getProjects } from "../api/projectsAPI";
import { addTask } from "../api/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  updateElement,
  deleteElement,
  setTable,
  emptyTable,
} from "../redux/reducers/tableSlice";
import moment from "moment";

export const Tasks = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);

  const [showModal, setShowModal] = useState(false);
  const [taskQuery, setTaskQuery] = useState({});
  const [invalidValues, setInvalidValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const verifyValues = () => {
    let invalid = false;
    let newInvalidValues = {
      label: false,
      description: false,
      project: false,
      starting_date: false,
      ending_date: false,
    };
    if (!taskQuery.label) {
      newInvalidValues.label = true;
      invalid = true;
    }
    if (!taskQuery.description) {
      newInvalidValues.description = true;
      invalid = true;
    }
    if (!taskQuery.project) {
      newInvalidValues.project = true;
      invalid = true;
    }
    if (!taskQuery.starting_date) {
      newInvalidValues.starting_date = true;
      invalid = true;
    }
    if (!taskQuery.ending_date) {
      newInvalidValues.ending_date = true;
      invalid = true;
    }
    setInvalidValues(newInvalidValues);
    return invalid;
  };

  const addTaskFunc = async () => {
    setLoading(true);
    if (!verifyValues()) {
      try {
        const res = await addTask(taskQuery);
        console.log(res);
        if (res.data.success) {
          setShowModal(false);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const getProjectsFunc = async () => {
    try {
      const res = await getProjects();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeQuery = (e) => {
    setInvalidValues({
      ...invalidValues,
      [e.target.name]: false,
    });
    setTaskQuery({
      ...taskQuery,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getProjectsFunc();
  }, []);

  useEffect(() => {
    setInvalidValues({});
    setTaskQuery({});
  }, [showModal]);

  return (
    <>
      <div className="new-display">
        <Button
          className="inactive-tab new-button"
          onClick={() => setShowModal(true)}
        >
          + New Task
        </Button>
      </div>
      <Table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th className="desc">Description</th>
            <th>Started At</th>
            <th>Ended At</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Project</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((t) => (
            <tr key={t._id}>
              <td>{t.label}</td>
              <td>{t.description}</td>
              <td>
                <CiCalendar className="mb-1" />
                {t.starting_date}
              </td>
              <td>
                <CiCalendar className="mb-1" />
                {t.ending_date}
              </td>

              <td>
                <div className="created">
                  {moment(t.createdAt).format("DD/MM/YYYY")}
                </div>
              </td>
              <td>
                <div className="updated">
                  {moment(t.updatedAt).format("DD/MM/YYYY")}
                </div>
              </td>
              <td>{t.project}</td>
              <td>
                <MdModeEdit size={20} color={"#7e26d8"} />
                <MdDelete size={20} color={"#7e26d8"} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalComponent
        modal={showModal}
        toggle={() => setShowModal(!showModal)}
        header={"Add new task"}
        smallheader={"Fill your task attributes"}
        submit={"Save"}
        onSubmit={addTaskFunc}
        loading={loading}
        Icon={<AiFillFlag />}
      >
        <Form>
          <FormGroup>
            <Label for="label">Label*</Label>
            <Input
              id="label"
              name="label"
              placeholder="Write a label..."
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.label}
              value={taskQuery.label}
            />
            <FormFeedback>Label is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description*</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              placeholder="Write a description..."
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.description}
              value={taskQuery.description}
            />
            <FormFeedback>Description is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="project">Project*</Label>
            <Input
              id="project"
              name="project"
              type="select"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.project}
              value={taskQuery.project}
            >
              <option value={""}>Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.label}
                </option>
              ))}
            </Input>
            <FormFeedback>Project is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="starting_date">Started at*</Label>
            <Input
              id="starting_date"
              name="starting_date"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.starting_date}
              value={taskQuery.starting_date}
            />
            <FormFeedback>Starting date is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="ending_date">Ended at*</Label>
            <Input
              id="ending_date"
              name="ending_date"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.ending_date}
              value={taskQuery.ending_date}
            />
            <FormFeedback>Ending date is Required!</FormFeedback>
          </FormGroup>
        </Form>
      </ModalComponent>
    </>
  );
};
