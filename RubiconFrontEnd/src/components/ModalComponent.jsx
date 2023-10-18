// import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ModalComponent = (props) => {
  const {
    modal,
    toggle,
    children,
    header,
    smallheader,
    submit,
    onSubmit,
    loading,
    Icon,
  } = props;
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="header-flex">
          <div>{Icon}</div>
          <div>
            <div>{header}</div>
            <div className="modal-fill">{smallheader}</div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button className="modal-cancel" onClick={toggle} disabled={loading}>
          Cancel
        </Button>
        <Button disabled={loading} className="modal-submit" onClick={onSubmit}>
          {submit}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
