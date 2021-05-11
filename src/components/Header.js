import React, {Fragment} from "react";
import Toolbar from "./Toolbar";
import {getUsername} from "../utils/Auth";

const Header = () => {

    const username = getUsername();

    return (
        <Fragment>
            <div className={'header'}>
                <div className={'logo'}>
                    <h2 className={'title'}>
                        Snippets Compiler
                        <span>{`Hey, ${username}! Amuse-toi 😎`}</span>
                    </h2>

                </div>
                <div className={'toolbar-container'}>
                    <Toolbar />
                </div>
            </div>
            <style jsx>{`
            
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10;
                }
                
                .logo {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    font-family: IBM;
                    font-size: 20px;
                    letter-spacing: 2px;
                    background-color: #009dc7;
                }
                
                .title {
                    font-size: 28px;
                    text-align: center;
                }
                
                .title span {
                    display: block;
                    font-family: Courier New, monospace;
                    font-size: 12px;
                    font-weight: 100
                }
                
                .toolbar-container {
                    display: flex;
                    justify-content: center;
                    height: 30px;
                    background-color: #dadada;
                }
            
            `}</style>
        </Fragment>
    );
}

export default Header;