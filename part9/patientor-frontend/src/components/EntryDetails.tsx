import React from "react";
import { Card, Icon } from "semantic-ui-react";
import {
  Entry,
  IHealthCheckEntry,
  IHospitalEntry,
  IOccupationalHealthcareEntry,
  Type,
} from "../types";
import HealthRatingBar from "./HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntry = ({ entry }: { entry: IHospitalEntry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <p>{entry.diagnosisCodes}</p>
          <p>{entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: IOccupationalHealthcareEntry;
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" />{" "}
        </Card.Header>
        <Card.Description>
          {entry.description}
          <p>{entry.employerName}</p>
          <p>{entry.sickLeave?.startDate}</p>
          <p>{entry.sickLeave?.endDate}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HealthCheckEntry = ({ entry }: { entry: IHealthCheckEntry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user doctor" />{" "}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Meta>
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case Type.Hospital:
      return <HospitalEntry entry={entry} />;
    case Type.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case Type.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
