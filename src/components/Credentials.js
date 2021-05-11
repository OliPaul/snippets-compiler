import React, {Fragment, useState} from "react";
import {TextField} from "@material-ui/core";

const Credentials = ({className, data, errorMsg}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChange = ({target: {value}}) => {
        errorMsg.username = null;
        setUserName(value);
        data.username = value;

    }

    const handlePasswordChange = ({target: {value}}) => {
        errorMsg.password = null;
        setPassword(value);
        data.password = value;
    }

    return (
        <Fragment>
            <div>
                <TextField
                    required
                    error={errorMsg.username}
                    helperText={errorMsg.username}
                    label="Username"
                    variant="outlined"
                    type={'text'}
                    className={className}
                    value={userName}
                    onChange={handleUserNameChange}/>
            </div>
            <div>
                <TextField
                    required
                    error={errorMsg.password}
                    helperText={errorMsg.password}
                    label="Password"
                    variant="outlined"
                    type={'password'}
                    className={className}
                    value={password}
                    onChange={handlePasswordChange}/>
            </div>
        </Fragment>
    );
}

export default Credentials;