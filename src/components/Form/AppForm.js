import React from "react";
import { Formik, Form } from "formik";
function AppForm({ initialValues, validationSchema, onSubmit, children }) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
}

export default AppForm;
