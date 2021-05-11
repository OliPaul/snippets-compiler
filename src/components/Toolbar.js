import React, {Fragment, useState} from "react";
import Add from "@material-ui/icons/Add";
import Run from '@material-ui/icons/AccessTime';
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {compile} from "../services/Compiler"
import Output from "./Output";
import useToken from "./useToken";

const Toolbar = () => {

    const [code, setCode] = useRecoilState(CodeAtom);
    const [openOutput, setOpenOutput] = useState(false);
    const [outputContent, setOutputContent] = useState("");
    const { token, setToken } = useToken();
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
                <div className={'add'} onClick={handleAddBlock}>
                    <Add className={'add-button'}/>
                    <span>new snippet</span>
                </div>
                <div className={'run'} onClick={handleRunCode}>
                    <Run className={'run-button'}/>
                    <span>run</span>
                </div>

            </div>
            <Output isOpen={openOutput} onClose={() => setOpenOutput(false)} content={outputContent} />
            <style jsx>{`
            
                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    width: 95%;
                    z-index: 9;
                }
                
                .add, .run {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                
                .run {
                    font-style: italic;
                }
                
                .add-button, .run-button {
                    color: grey;
                    font-size: 25px;
                }
            `}</style>
        </Fragment>
    )
}

export default Toolbar;

