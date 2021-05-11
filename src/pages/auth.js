import React, {Fragment, useState} from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const Auth = ({setToken}) => {

    const [signupPage, setSignupPage] = useState(false);

    const handleSignUpSuccess = () => {
        setSignupPage(false);
    }


    return (
        <Fragment>
            <div className={'content'}>
                <div className={'form-content'}>
                    <h2 className={'title'}>
                        Snippets Compiler
                        <span>{signupPage ? 'Sign up' : 'Login'}</span>
                    </h2>
                    {signupPage ?
                            <Fragment>
                                <Signup onSuccess={handleSignUpSuccess} />
                                <div className={'account-info'} onClick={() => setSignupPage(false)}>
                                    I have an account
                                </div>
                            </Fragment> :
                            <Fragment>
                                <Signin setToken={setToken}/>
                                <div className={'account-info'} onClick={() => setSignupPage(true)}>
                                    I don't have an account
                                </div>
                            </Fragment>
                    }
                </div>
            </div>

            <style jsx>{`
                .content {
                    display: flex;
                    justify-content: center;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    top: 130px;
                    padding-top: 20px; 
                    overflow: scroll;
                    z-index: 9;
                }
                
                .form-content {
                    text-align: center;
                    width: 50%;
                }
                
                .title {
                    letter-spacing: 3px;
                    font-family: Courier New, monospace;
                    margin-bottom: 50px;
                }
                
                .title span {
                    display: block;
                    font-size: 13px;
                    
                }
                
                .account-info {
                    margin-top: 20px;
                    cursor: pointer;
                    font-family: Courier New, monospace;
                    font-weight: 100;
                }
                
                .account-info:hover {
                    font-weight: 700;
                }
            `}</style>
        </Fragment>
    );
}

export default Auth;