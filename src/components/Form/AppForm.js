import React from "react";
import { Formik, Form } from "formik";
function AppForm({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...otherProps
}) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...otherProps}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
}

export default AppForm;
