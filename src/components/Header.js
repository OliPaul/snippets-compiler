import React, {Fragment} from "react";
import Toolbar from "./Toolbar";

const Header = () => {

    return (
        <Fragment>
            <div className={'header'}>
                <div className={'logo'}>Snippets Compiler</div>
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