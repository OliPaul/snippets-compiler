import React, {Fragment, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {ProjectAtom} from "../atoms/ProjectAtom";
import {createSnippet, getSnippets} from "../services/Snippets";
import useToken from "./useToken";
import randomWord from 'random-words';

const Menu = ({setNewProjectDialogOpen}) => {

    const [project, setProject] = useRecoilState(ProjectAtom);
    const [code, setCode] = useRecoilState(CodeAtom);
    const counterBlock = code.length;
    const {token, setToken} = useToken();

    const handleAddBlock = (snippetData) => {
        //Adding new block
        setCode(snippetData);
    }

    const handleNewSnippet = async () => {
        if (project == "") {
            setNewProjectDialogOpen(true);
        } else {
            const projectObject = JSON.parse(project);
            const snippetName = randomWord();
            const codeValue = "";
            const response = await createSnippet(token, snippetName, codeValue, projectObject.id);

            if(response.error) {
                console.log("error");
                return;
            }

            const snippetData = await getSnippets(token, null, response.location);
            console.log(snippetData);

            if(snippetData.error){
                console.log("Cannot get snippets for this project");
                return;
            }

            handleAddBlock(snippetData);
        }
    }

    const handleCloseProject = () => {
        setProject("");
    }

    return (
        <Fragment>
            <ul className={'menu-container'}>
                <li onClick={() => setNewProjectDialogOpen(true)}>New project (CMD+N)</li>
                <li onClick={handleNewSnippet}>New snippet (CMD+N+S)</li>
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