import React, {Fragment, useEffect, useState} from "react";
import Credentials from "./Credentials";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {signUp} from '../services/Auth'
import {validateEmail, validatePassword} from "../utils/Auth";

const Signup = ({onSuccess}) => {

    const [credentialsData, setCredentialsData] = useState({});
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [formError, setFormError] = useState("");

    useEffect(() => {
        setErrorMsg({
            email: null,
            username: null,
            password: null
        })
    }, []);

    const handleEmailChange = ({target: {value}}) => {
        errorMsg.email = null;
        setEmail(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        setFormError("");

        //Email validation
        if (!email || email === "")
            error.email = "Please fill email field."
        else if (!validateEmail(email))
            error.email = "Invalid email address";

        if (!credentialsData.username || credentialsData.username === "")
            error.username = "Please fill username field.";

        //Password validation
        if (!credentialsData.password || credentialsData.password === "")
            error.password = "Please fill password field."
        else if (!validatePassword(credentialsData.password))
            error.password = "Password must contain at least one digit, one lower and upper case and 8 characters."


        if (Object.keys(error).length !== 0) {
            setErrorMsg(error);
            return
        }

        const userInfo = {
            email: email,
            username: credentialsData.username,
            password: credentialsData.password,
            roles: ['user', 'admin']
        }

        const response = await signUp(userInfo);

        if(response.error) {
            setFormError("❌  Unable to register your account. \nPlease try again...");
            return;
        }

        setFormError(`✅  ${response.message} Wait a few moment, you will be redirected...`);
        setTimeout(() => {
            onSuccess();
        }, 5000);
    }

    return (
        <Fragment>
            <div className={'signup-content'}>
                <div className={'form-msg'}>{formError}</div>
                <div>
                    <TextField
                        required
                        error={errorMsg.email}
                        helperText={errorMsg.email}
                        className={'input-field'}
                        label="Email"
                        variant="outlined"
                        type={'email'}
                        value={email} onChange={handleEmailChange}/>
                </div>
                <Credentials className={'input-field'} data={credentialsData} errorMsg={errorMsg}/>
                <Button className={'button'} variant="contained" color="primary" onClick={handleSubmit}>
                    Valider
                </Button>

            </div>
            <style jsx>{`
                .signup-content {
                    text-align: center;
                }
                
                .input-field {
                    margin: 10px 0;
                    width: 300px !important;
                }
                
                .button {
                    margin: 10px 0;
                }
                
                .form-msg {
                    margin-bottom: 20px;
                    font-family: Courier New, monospace;
                }
            `}</style>
        </Fragment>
    );
}

export default Signup;

