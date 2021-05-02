import React, {Fragment, useState} from "react";
import AceEditor from "react-ace";
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import {replaceItemAtIndex} from "../utils/ArrayUtils";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = ({code}) => {

    const [codeValue, setCodeValue] = useState(code.codeValue);
    const [codeAtom, setCodeAtom] = useRecoilState(CodeAtom);

    const handleCodeChange = (value) => {
        setCodeValue(value);
        updateValueFromKey(code.id, value);
    }

    const updateValueFromKey = (key, value) => {
        const index = codeAtom.findIndex((el) => el.id === key);
        const newCodeList = replaceItemAtIndex(codeAtom, index, {
            id: code.id,
            codeValue: value
        });

        setCodeAtom(newCodeList)
    }

    return (
        <Fragment>
            <AceEditor
                className={'code-block-' + code.id}
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
                }}
            />
            <style jsx>{`
                .code-block-${code.id} {
                    margin-bottom: 20px;
                    height: 100px !important;
                    border-radius: 5px;
                    overflow: scroll;
                }
            `}</style>
        </Fragment>
    );
}

export default CodeEditor;