import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry, Type } from "../types";
import { formatDate } from "../util";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: Type.Hospital,
        description: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
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

        if (values.type === Type.Hospital && !values.discharge.date) {
          errors.type =
            "Hospital type requires discharge date field and discharge criteria field";
          if (!values.discharge.date) {
            errors["discharge.date"] = requiredError;
          }
        }
        if (values.type === Type.Hospital && !values.discharge.criteria) {
          errors.type =
            "Hospital type requires discharge date field and discharge criteria field";
          if (!values.discharge.criteria) {
            errors["discharge.criteria"] = requiredError;
          }
        }
        if (values.type === Type.Hospital && values.discharge.date) {
          if (formatDate(values.discharge.date) !== true) {
            errors["discharge.date"] = formatDate(
              values.discharge.date
            ) as string;
          }
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
            <Grid>
              <Grid.Column width={8}>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge date"
                  name="discharge.date"
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
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

export default HospitalForm;
