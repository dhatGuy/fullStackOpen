import React from "react";
import { Modal, Segment, Tab } from "semantic-ui-react";
import { NewEntry, Type } from "../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const panes = [
    {
      menuItem: Type.HealthCheck,
      render: () => (
        <Tab.Pane attached={false}>
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: Type.OccupationalHealthcare,
      render: () => (
        <Tab.Pane attached={false}>
          <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: Type.Hospital,
      render: () => (
        <Tab.Pane attached={false}>
          <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <Tab menu={{ attached: false }} panes={panes} />
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
