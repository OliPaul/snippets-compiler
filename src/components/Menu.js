import React, {Fragment, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {ProjectAtom} from "../atoms/ProjectAtom";

const Menu = ({setNewProjectDialogOpen}) => {

    const setProject = useSetRecoilState(ProjectAtom);
    const [code, setCode] = useRecoilState(CodeAtom);
    const counterBlock = code.length;

    const handleAddBlock = () => {
        //Adding new block
        setCode((oldCode) => [
            ...oldCode,
            {
                id: counterBlock + 1,
                codeValue: ""
            }
        ]);
    }

    const handleCloseProject = () => {
        setProject("");
    }

    return (
        <Fragment>
            <ul className={'menu-container'}>
                <li onClick={() => setNewProjectDialogOpen(true)}>New project (CMD+N)</li>
                <li onClick={handleAddBlock}>New snippet (CMD+N+S)</li>
                <li>Open project (CMD+O)</li>
                <li onClick={handleCloseProject}>Close project (CMD+W)</li>
                <li>Delete project (CMD+X)</li>
            </ul>

            <style jsx>{`
                .menu .menu-container {
                    left: 0;
                    position: absolute;
                    background-color: #dadada;
                    width: 200px;
                    list-style: none;
                    padding: 5px;
                    top: 15px;
                    
                }
               
                .menu-container li {
                    height: 30px;
                }
                
                .menu-container li:hover {
                    background-color: grey
                }
            `}</style>
        </Fragment>
    );
}

export default Menu;