import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import "yup-phone";
import '../verifyPhone.css'

function PasswordInput({checkPassword,sendSmsAgain}) {
    let schema = Yup.object().shape({
        code: Yup.string()
            .required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .length(4)
    })
    const initialValues = {
        code: '',
    };
    const [Loading,setLoading] = useState(false);
    const [sendAgainLoading,setSendAgainLoading] = useState(false);
    const send_sms_again =async ()=>{
        setSendAgainLoading(true)
        await sendSmsAgain()
        setSendAgainLoading(false)
    }
    const handleSubmit = async(values)=>{
        setLoading(true)
        await checkPassword(values.code)
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
                        <p className="title">הזן את הקוד שקיבלת</p>
                        <Field name="code" type="code" className="form-control" />
                        <ErrorMessage
                            name="code"
                            component="div"
                            className="error-message"
                        />
                        <LoadingButton
                            className="submit-btn"
                            type="submit"
                            loading={Loading}
                            variant="contained"
                        >
                            אישור
                        </LoadingButton>
                        <LoadingButton
                            className="submit-btn"
                            onClick={()=>send_sms_again()}
                            loading={sendAgainLoading}
                            variant="flat"
                        >
                            שלח שוב
                        </LoadingButton>


                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default PasswordInput;