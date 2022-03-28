import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import "yup-phone";
import '../verifyPhone.css'

function PasswordInput() {
    let schema = Yup.object().shape({
        password: Yup.string()
            .required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .length(5)
    })
    const initialValues = {
        password: '',
    };
    const handleSubmit = (values)=>{
alert(values.password)
    }
    return (
        <div className="phone-number-form">
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="form-group">
                        <p className="title">הזן את הקוד שקיבלת</p>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="error-message"
                        />
                        <Button className="submit-btn" type="submit" variant="contained">אישור</Button>

                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default PasswordInput;