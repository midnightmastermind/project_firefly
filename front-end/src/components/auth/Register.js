import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import ExtraLoginOptions from "../components/login/ExtraLoginOptions";
import Button from "../form/Button";

import { oauthRegister, register } from "../../slices/auth/auth";
import { clearMessage } from "../../slices/site/message";

// properties for Button component: register button
const registerButton = {
    style: {
        color: 'black',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '10px'
    },
    text: 'Register',
    type: 'submit',
    link: null /* will probably need to redirect to homepage (user view)? */
}

// register card (form) style
const registerCardStyle = {
    margin: 'auto',
    border: '2px solid var(--light-blue)',
    padding: '20px 25px 30px',
    backgroundColor: 'rgba(0,0,0,.6)',
    width: '100%',
    borderRadius: '3px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white',
}

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;

        setSuccessful(false);

        dispatch(register({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const typeOfLogin = [
        "google",
        // "FACEBOOK",
        // "GITHUB",
        "microsoft",
        // "Twitter",
        "linkedin",
        // "Paypal",
        // "Instagram"
    ];

    const handleOAuthRegister = (token, type) => {
        setSuccessful(false);

        dispatch(oauthRegister({ token, type }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setSuccessful(false);
            });
    };
    
    return (
        <div className="w-full">
            {/* Header */}
            {/* <div className="py-6">
                <h1 className="text-center text-white text-4xl md:text-8xl">Register</h1>
            </div> */}

            {/* Page Content */}
            <div className="px-10 md:px-52 lg:px-96 py-6 md:py-8">

                {/* Register Form Card */}
                <div style={registerCardStyle}>
                    <h2 className="text-xl md:text-2xl pb-4 text-center">Register for site here.</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    {/* First name field not currently supported by anything in backend! */}
                                    <div className="px-6 pb-3">
                                        <label htmlFor="first name">First Name</label>
                                        <Field name="first name" type="text" className="input border border-light-blue p-2 w-full h-8" />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    {/* Last name field not currently supported by anything in backend! */}
                                    <div className="px-6 pb-3">
                                        <label htmlFor="last name">Last Name</label>
                                        <Field name="last name" type="text" className="input border border-light-blue p-2 w-full h-8" />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    <div className="px-6 pb-3">
                                        <label htmlFor="username">Username</label>
                                        <Field name="username" type="text" className="input border border-light-blue p-2 w-full h-8" />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    <div className="px-6 pb-3">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="email" className="input border border-light-blue p-2 w-full h-8" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    <div className="px-6 pb-3">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="input border border-light-blue p-2 w-full h-8"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    {/* Confirm password field not currently supported by anything in backend! */}
                                    <div className="px-6 pb-3">
                                        <label htmlFor="confirm password">Confirm Password</label>
                                        <Field
                                            name="confirm password"
                                            type="password"
                                            className="input border border-light-blue p-2 w-full h-8"
                                        />
                                        <ErrorMessage
                                            name="confirm password"
                                            component="div"
                                            className="bg-red-300 p-2 rounded-sm"
                                        />
                                    </div>

                                    <div className="flex justify-center">
                                        <Button props={registerButton} />
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>

                </div>
            </div>
            {/* <div className="extra-logins">
                <ExtraLoginOptions authType="register" callBackFunction={handleOAuthRegister} typeOfLogin={typeOfLogin} />
            </div> */}

            {message && (
                <div>
                    <div className={successful ? "bg-green-300 p-2 rounded-sm" : "bg-red-300 p-2 rounded-sm"} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Register;
