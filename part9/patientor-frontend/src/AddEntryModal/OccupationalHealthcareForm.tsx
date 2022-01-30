import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry, Type } from "../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: Type.OccupationalHealthcare,
        description: "",
        diagnosisCodes: [],
        sickLeave: {
          endDate: "",
          startDate: "",
        },
        employerName: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.description) {
          errors.discharge = requiredError;
        }

        if (
          values.type === Type.OccupationalHealthcare &&
          !values.employerName
        ) {
          errors.type = "Occupational Health care requires employer name field";
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer Name"
              name="employerName"
              placeholder="Employer Name"
              component={TextField}
            />
            <Grid>
              <Grid.Column width={8}>
                <Field
                  label="Sick Leave Start Date "
                  placeholder="Start date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label="Sick Leave End Date"
                  placeholder="End date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </Grid.Column>
            </Grid>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;
