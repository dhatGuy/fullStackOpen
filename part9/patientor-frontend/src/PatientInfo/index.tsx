/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../components/EntryDetails";
import { apiBaseUrl } from "../constants";
import {
  addEntry,
  setDiagnosisList,
  setPatient,
  useStateValue,
} from "../state";
import { Diagnosis, NewEntry, Patient } from "../types";

const PatientInfo = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{
    id: string;
  }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(data));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  React.useEffect(() => {
    const getInfo = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnoses));

        dispatch(setPatient(patient));
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage += error.response.data.message;
        }
        console.error(errorMessage);
      }
    };
    if (!patient || patient.id !== id) {
      void getInfo();
    }
  }, [dispatch]);
  return (
    <div>
      <AddEntryModal
        onSubmit={submitNewEntry}
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
      />
      <span>
        {patient?.gender === "male" ? (
          <Icon name="mars" size="big" />
        ) : (
          <Icon name="venus" size="big" />
        )}
        <h2>{patient?.name}</h2>
      </span>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h2>Entries</h2>{" "}
      <Button primary type="button" onClick={openModal}>
        New entry
      </Button>
      <div>
        {patient?.entries.map((entry) => (
          <div key={entry.id}>
            {/* <p>
              {entry.date} <span>{entry.description}</span>
            </p>
            {entry.diagnosisCodes?.map(
              (code) =>
                diagnoses[code] && (
                  <ul key={code}>
                    <li>
                      {diagnoses[code].code} {diagnoses[code].name}
                    </li>
                  </ul>
                )
            )} */}
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
