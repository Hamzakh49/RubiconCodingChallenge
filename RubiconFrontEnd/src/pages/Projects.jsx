// import React from 'react'
import { useState } from "react";
import { Button, Table } from "reactstrap";
import { CiCalendar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalComponent } from "../components/ModalComponent";
import { Form, FormGroup, Label, Input } from "reactstrap";

export const Projects = () => {
  const [showModal, setShowModal] = useState(false);
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
      >
        <Form>
          <FormGroup>
            <Label>Label*</Label>
            <Input placeholder="Write a label..."></Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Description*</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder="Write a description..."
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Started at*</Label>
            <Input
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Ended at*</Label>
            <Input
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
            />
          </FormGroup>
        </Form>
      </ModalComponent>
    </>
  );
};
