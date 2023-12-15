import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Tooltip, Button, Intent, InputGroup, FormGroup } from "@blueprintjs/core";

import { login, oauthLogin } from "../slices/auth/auth";
import { clearMessage } from "../slices/site/message";
import PageContainer from "components/navigation/PageContainer";
// import ExtraLoginOptions from "../components/login/ExtraLoginOptions";

// properties for Button component: login button
const loginButton = {
    style: {
        color: 'black',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '10px'
    },
    text: 'Login',
    type: 'submit',
    link: null /* this is test link; it works! @todo: change this link */
}

// properties for  Button component: sign up button
const signupButton = {
    style: {
        color: 'black',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '10px'
    },
    text: 'Sign Up',
    type: 'button',
    link: '/about' /* this is a test link; it works! @todo: change this link */
}


// login card style
const loginCardStyle = {
    margin: 'auto',
    padding: '20px 25px 30px',
    width: '100%',
    borderRadius: '3px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white',
    paddingTop: '0px'
}

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

const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
});


const initialValues = {
    username: "",
    password: "",
};

const Login = (props) => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const handleLogin = (values) => {
        console.log(values)
        const { username, password } = values;
        setLoading(true);

        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate("/");
                if (props.isLoginOpen) {
                    props.isLoginOpen(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleLogin(values)
        },
      });

    const handleOauthLogin = (token, type) => {
        setLoading(true);

        dispatch(oauthLogin({ token, type }))
            .unwrap()
            .then(() => {
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    const handleLockClick = () => setShowPassword(!showPassword);

    const lockButton = (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} >
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip>
    );
    
    return (
        <PageContainer modal={true}>
            {/* Header */}
            <div className="">
                <h4 style={{margin: '10px'}} className="">Welcome!</h4>
            </div>
            <div style={loginCardStyle}>
                <h5 style={{margin: '5px'}}>If you are a returning user, log in here.</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup
                            label="Username"
                            labelFor="username"
                            labelInfo="(required)"
                            style={{alignItems: 'start', flexDirection: 'column'}}
                        >
                            <InputGroup onChange={formik.handleChange} name="username" value={formik.values.username} id="username" placeholder="Placeholder text" />
                        </FormGroup>
                        <FormGroup
                            label="Password"
                            labelFor="password"
                            labelInfo="(required)"
                            type="password"
                            style={{alignItems: 'start', flexDirection: 'column'}}
                        >
                            <InputGroup rightElement={lockButton} type={showPassword ? "text" : "password"} onChange={formik.handleChange} name="password" value={formik.values.password} id="password" placeholder="Placeholder text" />
                        </FormGroup>
                        <div>
                            <Button type="submit" intent={Intent.SUCCESS} className="bp5-minimal" icon="" text="Login" />
                            <a href="">Forgot password?</a>
                        </div>
                        <a>Don't have an account? Sign up here.</a>
                    </form>
                {/* <div className="extra-logins">
                    <ExtraLoginOptions authType="login" callBackFunction={handleOauthLogin} typeOfLogin={typeOfLogin} />
                </div> */}
            </div>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

export default Login;
