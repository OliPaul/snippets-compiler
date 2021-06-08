import React, {Fragment, useEffect, useState} from "react";
import AceEditor from "react-ace";
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {removeItemAtIndex, replaceItemAtIndex} from "../utils/ArrayUtils";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import RunSnippet from "./RunSnippet";
import {compile} from "../services/Compiler";
import DeleteSnippet from "./DeleteSnippet";
import SnippetOutput from "./SnippetOutput";
import useToken from "./useToken";
import {deleteSnippet, updateSnippet} from "../services/Snippets";

const CodeEditor = ({key, code}) => {

    const [codeValue, setCodeValue] = useState(code.codeValue);
    const [output, setOutput] = useState("");
    const [codeAtom, setCodeAtom] = useRecoilState(CodeAtom);
    const {token, setToken} = useToken();
    const index = codeAtom.findIndex((el) => el.id === code.id);
    let snippet = codeAtom.find((el) => el.id === code.id);
    let snippetName = "";
    let createdUserId = "";

    if(codeAtom.length > 0) {
        snippetName = snippet.name;
        createdUserId = snippet.createUserId;
    }

    const handleCodeChange = (value) => {
        setCodeValue(value);
        updateValueFromKey(code.id, value);
    }

    const updateValueFromKey = (key, value) => {

        const newSnippet = {
            content: value,
            createUserId: snippet.createUserId,
            createdDate: snippet.createdDate,
            id: snippet.id,
            name: snippet.name,
            projectId: snippet.projectId,
            updateDate: snippet.updateDate,
            updateUserId: snippet.updateUserId,
        }

        const newCodeList = replaceItemAtIndex(codeAtom, index, newSnippet);

        setCodeAtom(newCodeList)
    }

    const handleRunCode = async (code) => {
        setOutput("Compilation start...");
        //Send code to server for compilation
        const response = await compile(token, code);
        setOutput(`Result: ${response}`);

    }

    const handleUpdateCodeBlock = async () => {
        const response = await updateSnippet(token, snippet.id, snippet.name, snippet.content, snippet.projectId);

        if(response.error) {
            console.log("Cannot update");
            return;
        }
    }

    const handleDeleteCodeBlock = async () => {

        await deleteSnippet(token, snippet.id).then((response) => {
            if(response.error) {
                console.log("Cannot delete");
                return;
            }

            let newCodeList = removeItemAtIndex(codeAtom, index)
            setCodeAtom(newCodeList);
        })

    }

    return (
        <Fragment>
            <div key={key} className={'code-block-' + code.id}>
                <span className={'code-name'}>{snippetName} / {createdUserId}</span>
                <AceEditor
                    mode={'c_cpp'}
                    placeholder="Allez, écris un beau snippet ! 🔥"
                    theme={'monokai'}
                    name={'codeblock-' + code.id}
                    value={codeValue}
                    onChange={handleCodeChange}
                    onBlur={handleUpdateCodeBlock}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}/>
                <DeleteSnippet onClick={handleDeleteCodeBlock} className={'delete-snippet-' + code.id}/>
                <RunSnippet onClick={() => handleRunCode(codeValue)} className={'play-snippet-' + code.id}/>
            </div>
            {output != "" && <SnippetOutput output={output} className={'snippet-output-' + code.id}/>}
            <style jsx>{`
                .code-block-${code.id} {
                    margin: 20px auto 0 auto;
                    height: 100px !important;
                    border-radius: 5px 5px 0 0;
                    overflow: auto;
                    width: fit-content;
                    position: relative;
                    text-align: right;
                }
                
                .code-block-${code.id} .code-name {
                    font-size: 12px;
                    letter-spacing: 1px;
                    font-family: Courier New, monospace;
                    
                }
                
                .play-snippet-${code.id} {
                    color: green;
                    font-size: 22px;
                    cursor: pointer;
                }
                
                .delete-snippet-${code.id} {
                    color: red;
                    font-size: 20px;
                    cursor: pointer;
                }
                
                .code-block-${code.id} .play-snippet-${code.id} {
                    position: absolute;
                    top: 20px;
                    right: 10px;
                }
                
                .code-block-${code.id} .delete-snippet-${code.id} {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                }
                
                .code-block-${code.id} #codeblock-${code.id} {
                    width: 500px;
                    min-height: 100%;
                    height: unset !important;
                }
                
                .snippet-output-${code.id} {
                    margin: 0 auto;
                }
            `}</style>
        </Fragment>
    );
}

export default CodeEditor;