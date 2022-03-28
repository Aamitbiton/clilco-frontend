import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import '../verifyPhone.css'

export const  PhoneInput = () => {
   let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let schema = Yup.object().shape({
            phoneNumber: Yup.string().matches(phoneRegExp, 'מספר הטלפון לא תקין').length(10)
        })
    const initialValues = {
        phoneNumber: '',

    };
    const handleSubmit = ()=>{alert('ok')}
    return (
        <div className="phone-number-form">
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                    <Form>
                        <div className="form-group">
                            <Field name="phoneNumber" type="phoneNumber" className="form-control" />
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="error-message"
                            />
                            <Button className="submit-btn" type="submit" variant="contained">המשך</Button>

                        </div>
                    </Form>
            </Formik>
        </div>
    );

}

export default PhoneInput;
