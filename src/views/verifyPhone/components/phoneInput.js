import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import "yup-phone";
import '../verifyPhone.css'
import LoadingButton from "@mui/lab/LoadingButton";

export const  PhoneInput = ({smsSent}) => {
    let schema = Yup.object().shape({
            phoneNumber: Yup.string().phone('il').required()
    })
    const initialValues = {
        phoneNumber: '',
    }
    const [Loading,setLoading] = useState(false);

    const handleSubmit = async (values)=>{
        setLoading(true)
       await smsSent(values.phoneNumber)
        setLoading(false)
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
                            <LoadingButton
                                className="submit-btn"
                                type="submit"
                                loading={Loading}
                                variant="contained"
                            >
                                שלח קוד
                            </LoadingButton>
                        </div>
                    </Form>
            </Formik>
        </div>
    );

}

export default PhoneInput;
