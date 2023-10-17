// import React from 'react'
import { useState } from "react";
import { Button, Table } from "reactstrap";
import { CiCalendar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalComponent } from "../components/ModalComponent";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { addProject } from "../api/projectsAPI";

export const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectQuery, setProjectQuery] = useState({});
  const [loading, setLoading] = useState(false)

  const addProjectFunc = async () => {
    setLoading(true)
    try {
      // const query = {};
      const res = await addProject(projectQuery);
       if(res.data.success){
        setProjectQuery({})
        setShowModal(false)
        setLoading(true)
       } 
    } catch (err) {
      console.log(err);
    }
  };
  const changeQuery = (e) => {
    setProjectQuery({
      ...projectQuery,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
    console.log("projectQuery", projectQuery);
  // }, [projectQuery]);
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
      <Table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th className="desc">Description</th>
            <th>Started At</th>
            <th>Ended At</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <CiCalendar className="mb-1" />
              11/04/2023
            </td>
            <td>
              <CiCalendar className="mb-1" />
              11/04/2023
            </td>
            <td>
              <div className="created">11/04/2023</div>
            </td>
            <td>
              <div className="updated">11/04/2023</div>
            </td>
            <td>
              <MdModeEdit size={20} color={"#7e26d8"} />
              <MdDelete size={20} color={"#7e26d8"} />
            </td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <CiCalendar className="mb-1" />
              11/04/2023
            </td>
            <td>
              <CiCalendar className="mb-1" />
              11/04/2023
            </td>
            <td>
              <div className="created">11/04/2023</div>
            </td>
            <td>
              <div className="updated">11/04/2023</div>
            </td>
            <td>
              <MdModeEdit size={20} color={"#7e26d8"} />
              <MdDelete size={20} color={"#7e26d8"} />
            </td>
          </tr>
        </tbody>
      </Table>
      <ModalComponent
        modal={showModal}
        toggle={() => setShowModal(!showModal)}
        header={"Add new project"}
        smallheader={"Fill your project attributes"}
        submit={"Save"}
        onSubmit={addProjectFunc}
      >
        <Form>
          <FormGroup>
            <Label for="label">Label*</Label>
            <Input
              id="label"
              name="label"
              placeholder="Write a label..."
              onChange={(e) => changeQuery(e)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description*</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              placeholder="Write a description..."
              onChange={(e) => changeQuery(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="starting_date">Started at*</Label>
            <Input
              id="starting_date"
              name="starting_date"
              // placeholder="date placeholder"
              type="date"
              onChange={(e) => changeQuery(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="ending_date">Ended at*</Label>
            <Input
              id="ending_date"
              name="ending_date"
              placeholder="date placeholder"
              type="date"
              onChange={(e) => changeQuery(e)}
            />
          </FormGroup>
        </Form>
      </ModalComponent>
    </>
  );
};
