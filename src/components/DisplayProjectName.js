import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {ProjectAtom} from "../atoms/ProjectAtom";
import ShareIcon from '@material-ui/icons/Share';

const DisplayProjectName = () => {

    const projectString = useRecoilValue(ProjectAtom);
    let project = "N/D";
    let projectToken = "";

    if (projectString != "") {
        const projectObject = JSON.parse(projectString);
        project = projectObject.name;
        projectToken = projectObject.token;
    }

    const handleShareClick = () => {
        let textArea = document.createElement("textarea");
        textArea.value = projectToken;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            alert("Token copied to clipboard");
            textArea.remove();
        })
    }

    return (
        <Fragment>
            <div className={'project-name-container'}>

                <p>
                    Current project: &nbsp;
                    <span>{project}</span>
                    {
                        projectToken !== "" &&
                        <span className={'share'} onClick={handleShareClick}> | Share</span>
                    }
                </p>
            </div>
            <style jsx>{`
                .project-name-container {
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 0 10px;
                    z-index: 20;
                    display: flex;
                    flex-direction: row;
                }
                
                .project-name-container p {
                    font-family: Courier New, monospace;
                    font-size: 12px;
                    font-weight: 100;
                }
                
                .project-name-container p span {
                    font-weight: bold;
                }
                 
                .share {
                    font-size: 12px;
                    cursor: pointer
                }
            `}</style>
        </Fragment>
    );

}

export default DisplayProjectName;
