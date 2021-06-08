import React, {Fragment, useState} from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Run from '@material-ui/icons/AccessTime';
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {compile} from "../services/Compiler"
import Output from "./Output";
import useToken from "./useToken";
import Menu from "./Menu";
import NewProjectDialog from "./NewProjectDialog";
import OpenProjectDialog from "./OpenProjectDialog";

const Toolbar = () => {

    const [code, setCode] = useRecoilState(CodeAtom);
    const [openOutput, setOpenOutput] = useState(false);
    const [outputContent, setOutputContent] = useState("");
    const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
    const [openProjectDialogOpen, setOpenProjectDialogOpen] = useState(false);
    const {token, setToken} = useToken();


    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    const handleRunCode = async () => {
        setOutputContent("Compilation start...");
        setOpenOutput(true)
        //Get code value
        let codeValue = code.map(({codeValue}) => codeValue);
        // And join it with \n
        codeValue = codeValue.join("\n");
        //Send code to server for compilation
        const response = await compile(token, codeValue);
        setOutputContent(`Result: ${response}`);

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
            <Output isOpen={openOutput} onClose={() => setOpenOutput(false)} content={outputContent}/>
            <NewProjectDialog open={newProjectDialogOpen} handleClose={() => setNewProjectDialogOpen(false)} />
            <OpenProjectDialog open={openProjectDialogOpen} handleClose={() => setOpenProjectDialogOpen(false)} />
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

