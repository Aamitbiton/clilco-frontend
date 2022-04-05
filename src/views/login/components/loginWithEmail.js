import React from 'react';
import AppForm from "../../../components/Form/AppForm";
import * as Yup from "yup";
import FormFiled from "../../../components/Form/FormFiled";
import SubmitButton from "../../../components/Form/SubmitButton";

function LoginWithEmail(props) {
    const flex = {
        display: "flex",
        alignItems: "center",
        height: "100vh",
        flexDirection: 'column'
    };
    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),

    });
    return (
        <>
                <AppForm
                validationSchema={schema}
                    onSubmit={(values) => console.log(values)}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    <div style={flex}>

                    <FormFiled label={"אימייל"} name={"email"} />
                    <FormFiled label={"סיסמא"} name={"password"} />
                    <SubmitButton label={"הכנס"} />
                </div>

        </AppForm>
        </>

    );
}

export default LoginWithEmail;