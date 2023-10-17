import { useState } from "react";
import { Button, Table } from "reactstrap";
import { CiCalendar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalComponent } from "../components/ModalComponent";
import { Form, FormGroup, Label, Input } from "reactstrap";

export const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
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
              <Input bsSize={"sm"} type="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
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
        header={"Add new task"}
        smallheader={"Fill your task attributes"}
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
            <Label for="exampleSelect">Project*</Label>
            <Input id="exampleSelect" name="select" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
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
