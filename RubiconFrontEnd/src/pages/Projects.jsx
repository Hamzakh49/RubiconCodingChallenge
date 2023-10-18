// import React from 'react'
import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { CiCalendar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalComponent } from "../components/ModalComponent";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import {
  addProject,
  updateProject,
  getProject,
  deleteProject,
} from "../api/projectsAPI";
import { FaTasks } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  updateElement,
  deleteElement,
} from "../redux/reducers/tableSlice";
import moment from "moment";
import { toast } from "react-toastify";

export const Projects = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [projectQuery, setProjectQuery] = useState({});
  const [invalidValues, setInvalidValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [projectID, setProjectID] = useState("");

  const handleAddElement = (element) => {
    dispatch(addElement(element));
  };

  const handleUpdateElement = (element) => {
    dispatch(updateElement(element));
  };

  const handleDeleteElement = (id) => {
    dispatch(deleteElement(id));
  };

  const verifyValues = () => {
    let invalid = false;
    let newInvalidValues = {
      label: false,
      description: false,
      starting_date: false,
      ending_date: false,
    };
    if (!projectQuery.label) {
      newInvalidValues.label = true;
      invalid = true;
    }
    if (!projectQuery.description) {
      newInvalidValues.description = true;
      invalid = true;
    }
    if (!projectQuery.starting_date) {
      newInvalidValues.starting_date = true;
      invalid = true;
    }
    if (!projectQuery.ending_date) {
      newInvalidValues.ending_date = true;
      invalid = true;
    }
    setInvalidValues(newInvalidValues);
    return invalid;
  };

  const addProjectFunc = async () => {
    setLoading(true);
    if (!verifyValues()) {
      try {
        const res = await addProject(projectQuery);
        if (res.data.success) {
          toast.success(res.data.message);
          setShowModal(false);
          handleAddElement(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
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
  const getProjectFunc = async (id) => {
    try {
      setProjectID(id);
      const res = await getProject(id);
      if (res.data.success) {
        setShowModal(false);
        setProjectQuery({
          label: res.data.data.label,
          description: res.data.data.description,
          starting_date: res.data.data.starting_date,
          ending_date: res.data.data.ending_date,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateProjectFunc = async (id) => {
    setLoading(true);
    if (!verifyValues()) {
      try {
        const res = await updateProject(id, projectQuery);
        if (res.data.success) {
          toast.success(res.data.message);
          setShowModalEdit(false);
          handleUpdateElement({ newData: projectQuery, _id: id });
          setLoading(false);
        } else {
          toast.error(res.data.message);
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

  const deleteProjectFunc = async (id) => {
    setLoading(true);
    try {
      const res = await deleteProject(id);
      if (res.data.success) {
        toast.success(res.data.message);
        setShowModalDelete(false);
        handleDeleteElement(id);
        setLoading(false);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const changeQuery = (e) => {
    setInvalidValues({
      ...invalidValues,
      [e.target.name]: false,
    });
    setProjectQuery({
      ...projectQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (id) => {
    setShowModalEdit(true);
    getProjectFunc(id);
  };
  const handleDelete = (id) => {
    setShowModalDelete(true);
    setProjectID(id);
  };

  useEffect(() => {
    setInvalidValues({});
    setProjectQuery({});
  }, [showModal, showModalEdit]);

  return (
    <>
      <div className="new-display">
        <Button
          className="inactive-tab new-button"
          onClick={() => setShowModal(true)}
        >
          + New Project
        </Button>
      </div>
      <Table className="table" responsive>
        <thead>
          <tr>
            <th>Label</th>
            <th>Description</th>
            <th>Started At</th>
            <th>Ended At</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((t) => (
            <tr key={t?._id}>
              <td>{t?.label}</td>
              <td>{t?.description}</td>
              <td>
                <CiCalendar className="mb-1" />
                {t?.starting_date}
              </td>
              <td>
                <CiCalendar className="mb-1" />
                {t?.ending_date}
              </td>
              <td>
                <div className="created">
                  {moment(t?.createdAt).format("DD/MM/YYYY")}
                </div>
              </td>
              <td>
                <div className="updated">
                  {moment(t?.updatedAt).format("DD/MM/YYYY")}
                </div>
              </td>
              <td>
                <MdModeEdit
                  onClick={() => handleEdit(t?._id)}
                  size={20}
                  color={"#7e26d8"}
                  className="table-icon"
                />
                <MdDelete
                  onClick={() => handleDelete(t?._id)}
                  className="table-icon"
                  size={20}
                  color={"#7e26d8"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Project Modal */}
      <ModalComponent
        modal={showModal}
        toggle={() => setShowModal(!showModal)}
        header={"Add new project"}
        smallheader={"Fill your project attributes"}
        submit={"Save"}
        onSubmit={addProjectFunc}
        loading={loading}
        Icon={<FaTasks />}
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
            />
            <FormFeedback>Description is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="starting_date">Started at*</Label>
            <Input
              id="starting_date"
              name="starting_date"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.starting_date}
            />
            <FormFeedback>Starting date is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="ending_date">Ended at*</Label>
            <Input
              id="ending_date"
              name="ending_date"
              placeholder="date placeholder"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.ending_date}
            />
            <FormFeedback>Ending date is Required!</FormFeedback>
          </FormGroup>
        </Form>
      </ModalComponent>

      {/* Edit Button Modal */}
      <ModalComponent
        modal={showModalEdit}
        toggle={() => setShowModalEdit(!showModalEdit)}
        header={"Edit project"}
        smallheader={"Fill your project attributes"}
        submit={"Save"}
        onSubmit={() => updateProjectFunc(projectID)}
        loading={loading}
        Icon={<FaTasks />}
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
              value={projectQuery.label}
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
              value={projectQuery.description}
            />
            <FormFeedback>Description is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="starting_date">Started at*</Label>
            <Input
              id="starting_date"
              name="starting_date"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.starting_date}
              value={projectQuery.starting_date}
            />
            <FormFeedback>Starting date is Required!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="ending_date">Ended at*</Label>
            <Input
              id="ending_date"
              name="ending_date"
              placeholder="date placeholder"
              type="date"
              onChange={(e) => changeQuery(e)}
              invalid={invalidValues.ending_date}
              value={projectQuery.ending_date}
            />
            <FormFeedback>Ending date is Required!</FormFeedback>
          </FormGroup>
        </Form>
      </ModalComponent>

      {/* Delete Button Modal */}
      <ModalComponent
        modal={showModalDelete}
        toggle={() => setShowModalDelete(!showModalDelete)}
        submit={"Delete"}
        onSubmit={() => deleteProjectFunc(projectID)}
        loading={loading}
      >
        <div>Are you sure you want to delete this project?</div>
      </ModalComponent>
    </>
  );
};
