import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import "yup-phone";
import '../verifyPhone.css'

export const  PhoneInput = ({numberVerified}) => {
    let schema = Yup.object().shape({
            phoneNumber: Yup.string().phone('il').required()

    })
    const initialValues = {
        phoneNumber: '',
    };
    const handleSubmit = (values)=>{
        numberVerified(values.phoneNumber)
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
                            <p className="title">הכנס מספר טלפון</p>
                            <Field name="phoneNumber" type="phoneNumber" className="form-control" />
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="error-message"
                            />
                            <Button className="submit-btn" type="submit" variant="contained">שלח קוד</Button>

                        </div>
                    </Form>
            </Formik>
        </div>
    );

}

export default PhoneInput;
