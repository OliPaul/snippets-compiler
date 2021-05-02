import React, {Fragment} from "react";
import Close from "@material-ui/icons/Close";

const Output = ({isOpen, onClose, content}) => {

    return (
        <Fragment>
            <div className={`output ${isOpen ? 'opened' : 'closed'}`}>
                <div className={'output-header'}>
                    <p className={'output-header-title'}>Output</p>
                    <div className={'close'} onClick={onClose}>
                        <Close className={'close-button'}/>
                    </div>
                </div>
                <div className={'output-content'}>
                    <p>{content}</p>
                </div>
            </div>

            <style jsx>{`
                .output {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    height: 100px;
                    background-color: black;
                    color: green;
                    overflow: scroll;
                    z-index: 10;
                }
                
                .output-content {
                    padding: 0 10px;
                    font-size: 15px;
                }
                
                .output .output-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    max-width: 100%;
                    height: 30px;
                    background-color: #dadada;
                    margin-bottom: 10px;
                }
                
                .close {
                    cursor: pointer;
                }
                
                .close-button, .output-header-title {
                    color: black;
                }
                
                .opened {
                    animation: bottom-to-top 0.3s
                }
                
                .closed {
                    animation: top-to-bottom 0.3s
                }
                
                @keyframes bottom-to-top {
                    from {
                        bottom: -100px;
                    }
                    to {
                        bottom: 0;
                    }
                }
                
                @keyframes top-to-bottom {
                    from {
                        bottom: 0;
                    }
                    to {
                        bottom: -100px;
                    }
                }
            `}</style>
        </Fragment>
    );
}

export default Output;