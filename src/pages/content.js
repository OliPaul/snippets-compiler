import React, {Fragment} from "react";
import {useRecoilValue} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import CodeEditor from "../components/CodeEditor";

const Content = () => {

    const codeValue = useRecoilValue(CodeAtom);
    return (
        <Fragment>
            <div className={'content'}>
                <div className={'code-blocks-container'}>
                    {
                        codeValue.map((code) => (
                            <CodeEditor code={code} />
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
                    overflow: scroll;
                    z-index: 9;
                }
                
                .content .code-blocks-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 50%;
                    min-height: 100%;
                    overflow: auto;
                }
            `}</style>
        </Fragment>
    );
}

export default Content;