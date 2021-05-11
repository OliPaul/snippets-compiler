import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import CodeEditor from "../components/CodeEditor";

const Content = () => {

    const codeValue = useRecoilValue(CodeAtom);
    const [codeBlocks, setCodeBlocks] = useState(codeValue);

    useEffect(() => setCodeBlocks(codeValue), [codeValue]);

    return (
        <Fragment>
            <div className={'content'}>
                <div className={'code-blocks-container'}>
                    {
                        codeBlocks.map((code) => (
                            <CodeEditor key={code.id} code={code} />
                        ))
                    }
                </div>
            </div>

            <style jsx>{`
                .content {
                    display: flex;
                    justify-content: center;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    top: 130px;
                    padding-top: 20px; 
                    overflow: auto;
                    z-index: 9;
                }
                
                .content .code-blocks-container {
                    width: 50%;
                    min-height: 100%;
                }
            `}</style>
        </Fragment>
    );
}

export default Content;