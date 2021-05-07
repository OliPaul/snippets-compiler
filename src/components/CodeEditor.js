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

const CodeEditor = ({code}) => {

    const [codeValue, setCodeValue] = useState(code.codeValue);
    const [output, setOutput] = useState("");
    const [codeAtom, setCodeAtom] = useRecoilState(CodeAtom);
    const index = codeAtom.findIndex((el) => el.id === code.id);

    const handleCodeChange = (value) => {
        setCodeValue(value);
        updateValueFromKey(code.id, value);
    }

    const updateValueFromKey = (key, value) => {
        const newCodeList = replaceItemAtIndex(codeAtom, index, {
            id: key,
            codeValue: value
        });

        setCodeAtom(newCodeList)
    }

    const handleRunCode = async (code) => {
        setOutput("Compilation start...");
        //Send code to server for compilation
        const response = await compile(code);
        setOutput(`Result: ${response}`);

    }

    const handleDeleteCodeBlock = () => {

        let newCodeList = removeItemAtIndex(codeAtom, index)

        setCodeAtom(newCodeList);
    }

    return (
        <Fragment>
            <div className={'code-block-' + code.id}>
                <AceEditor
                    mode={'c_cpp'}
                    placeholder="Allez, écris un beau snippet ! 🔥"
                    theme={'monokai'}
                    name={'codeblock-' + code.id}
                    value={codeValue}
                    onChange={handleCodeChange}
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
            {output != "" && <SnippetOutput output={output} className={'snippet-output-' + code.id} />}
            <style jsx>{`
                .code-block-${code.id} {
                    margin: 20px auto 0 auto;
                    height: 100px !important;
                    border-radius: 5px 5px 0 0;
                    overflow: scroll;
                    width: fit-content;
                    position: relative;
                }
                
                .play-snippet-${code.id} {
                    color: green;
                    font-size: 22px;
                    cursor: pointer;
                }
                
                .delete-snippet-${code.id} {
                    color: red;
                    font-size: 19px;
                    cursor: pointer;
                }
                
                .code-block-${code.id} .play-snippet-${code.id} {
                    position: absolute;
                    top: 0;
                    right: 5px;
                }
                
                .code-block-${code.id} .delete-snippet-${code.id} {
                    position: absolute;
                    top: 0;
                    right: 25px;
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