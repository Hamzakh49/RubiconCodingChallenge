// import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ModalComponent = (props) => {
  const { modal, toggle, children, header, smallheader, submit, onSubmit } = props;
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div>{header}</div>
        <div className="modal-fill">{smallheader}</div>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button className="modal-cancel" onClick={toggle}>
          Cancel
        </Button>
        <Button className="modal-submit" onClick={onSubmit}>
          {submit}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
