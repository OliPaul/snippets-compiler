import React, {Fragment, useState} from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Run from '@material-ui/icons/AccessTime';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {compile} from "../services/Compiler"
import useToken from "./useToken";
import Menu from "./Menu";
import NewProjectDialog from "./NewProjectDialog";
import OpenProjectDialog from "./OpenProjectDialog";
import JoinProjectDialog from "./JoinProjectDialog";
import {OutputContentAtom} from "../atoms/OutputContentAtom";
import {ProjectAtom} from "../atoms/ProjectAtom";
import {SnippetsSelectedAtom} from "../atoms/SnippetsSelectedAtom";

const Toolbar = () => {

    const code = useRecoilValue(CodeAtom);
    const projectState = useRecoilValue(ProjectAtom);
    const snippetsSelectedState = useRecoilValue(SnippetsSelectedAtom);
    const setOutputContent = useSetRecoilState(OutputContentAtom);
    const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
    const [openProjectDialogOpen, setOpenProjectDialogOpen] = useState(false);
    const [joinProjectDialogOpen, setJoinProjectDialogOpen] = useState(false);
    const {token} = useToken();


    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    const handleRunCode = async () => {

        const output = JSON.stringify({response: "Compilation start...", redundancy: "Code analysis also start..."});
        setOutputContent(output);
        //Get code value
        let snippetsId = code.map(({id}) => id);

        if(snippetsSelectedState.length !== 0) {
            snippetsId = snippetsId.filter((id) => snippetsSelectedState.includes(id.toString()));
        }

        let project = JSON.parse(projectState);
        //Send code to server for compilation
        const response = await compile(token, snippetsId, project.id);

        setOutputContent(JSON.stringify(response));

    }

    return (
        <Fragment>
            <div className={'toolbar'}>
                <div className={'menu'} onClick={handleMenuOpen}>
                    <span>menu</span>
                    {
                        menuOpen ?
                            <Fragment>
                                <ArrowDropUpIcon className={'menu-button'}/>
                                <Menu
                                    setNewProjectDialogOpen={() => setNewProjectDialogOpen(true)}
                                    setOpenProjectDialogOpen={() => setOpenProjectDialogOpen(true)}
                                    setJoinProjectDialogOpen={() => setJoinProjectDialogOpen(true)}
                                />
                            </Fragment>
                            : <ArrowDropDownIcon className={'menu-button'}/>
                    }

                </div>
                <div className={'run'} onClick={handleRunCode}>
                    <Run className={'run-button'}/>
                    <span>run</span>
                </div>

            </div>
            <NewProjectDialog open={newProjectDialogOpen} handleClose={() => setNewProjectDialogOpen(false)} />
            <OpenProjectDialog open={openProjectDialogOpen} handleClose={() => setOpenProjectDialogOpen(false)} />
            <JoinProjectDialog open={joinProjectDialogOpen} handleClose={() => setJoinProjectDialogOpen(false)} />
            <style jsx>{`
            
                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    width: 95%;
                    z-index: 9;
                }
                
                .menu, .run {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                
                .menu {
                    position: relative;
                }
                
                .run {
                    font-style: italic;
                }
                
                .menu-button, .run-button {
                    color: grey;
                    font-size: 25px;
                }
            `}</style>
        </Fragment>
    )
}

export default Toolbar;

