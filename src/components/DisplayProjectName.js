import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {ProjectAtom} from "../atoms/ProjectAtom";

const DisplayProjectName = () => {

    const projectString = useRecoilValue(ProjectAtom);
    let project = "N/D";

    if(projectString != ""){
        const projectObject = JSON.parse(projectString);
        project = projectObject.name;
    }

    return (
        <Fragment>
            <div className={'project-name-container'}>
                <p>Current project : <span>{project}</span></p>
            </div>
            <style jsx>{`
                .project-name-container {
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 0 10px;
                    z-index: 20;
                }
                
                .project-name-container p {
                    font-family: Courier New, monospace;
                    font-size: 12px;
                    font-weight: 100;
                }
                
                .project-name-container p span {
                    font-weight: bold;
                }
            `}</style>
        </Fragment>
    );

}

export default DisplayProjectName;