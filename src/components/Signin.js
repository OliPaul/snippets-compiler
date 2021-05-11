import React, {Fragment, useEffect, useState} from "react";
import Credentials from "./Credentials";
import {Button} from "@material-ui/core";
import {validatePassword} from "../utils/Auth";
import {signIn} from "../services/Auth";

const Signin = ({setToken}) => {

    const [credentialsData, setCredentialsData] = useState({});
    const [errorMsg, setErrorMsg] = useState({});
    const [formError, setFormError] = useState("");

    useEffect(() => {
        setErrorMsg({
            username: null,
            password: null
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        setFormError("");

        if (!credentialsData.username || credentialsData.username === "")
            error.username = "Please fill username field.";

        //Password validation
        if (!credentialsData.password || credentialsData.password === "")
            error.password = "Please fill password field."
        else if (!validatePassword(credentialsData.password))
            error.password = "Password must contain at least one digit, one lower and upper case and 8 characters."


        if (Object.keys(error).length !== 0) {
            setErrorMsg(error);
            return;
        }

        const response = await signIn(credentialsData);

        if (response.error) {
            setFormError("❌  Unable to register your account. \nPlease try again...");
            return;
        }

        setToken(response);
    }

    return (
        <Fragment>
            <div className={'signin-content'}>
                <div className={'form-msg'}>{formError}</div>
                <Credentials className={'input-field'} data={credentialsData} errorMsg={errorMsg}/>
                <Button className={'button'} variant="contained" color="primary" onClick={handleSubmit}>
                    Valider
                </Button>

            </div>
            <style jsx>{`
                .signin-content {
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

export default Signin;

