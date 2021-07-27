import React, {Fragment, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";
import CodeEditor from "../components/CodeEditor";
import Output from "../components/Output";
import {ProjectAtom} from "../atoms/ProjectAtom";
import SockJsClient from "react-stomp";

const Content = () => {

    let SOCKET_URL = process.env.REACT_APP_BACK_URL + "/snippets";
    const [codeValue, setCodeValue] = useRecoilState(CodeAtom);
    const [projectString] = useRecoilState(ProjectAtom);
    const [codeBlocks, setCodeBlocks] = useState(codeValue);
    const [project, setProject] = useState("");

    useEffect(() => {
        if (projectString !== "") {
            setProject(JSON.parse(projectString));
        }
    }, [projectString]);

    useEffect(() => setCodeBlocks(codeValue), [codeValue]);

    const onMessageReceived = (msg) => {
        setCodeValue(msg);
    }

    const onConnect = () => {
        console.log("Connected!")
    }

    const onDisconnect = () => {
        console.log("Disconnected!")
    }

    return (
        <Fragment>
            <div>
                <SockJsClient
                    url={SOCKET_URL}
                    topics={["/listener/projects/" + project.id]}
                    onConnect={onConnect}
                    onDisconnect={onDisconnect}
                    onMessage={msg => onMessageReceived(msg)}
                    debug={false}
                />
            </div>
            <div className={'content'}>
                <div className={'code-blocks-container'}>
                    {
                        codeBlocks.map((code) => (
                            <CodeEditor key={code.id} code={code}/>
                        ))
                    }
                </div>
                <div className={'output-container'}>
                    {
                        codeBlocks.length !== 0 &&
                        <Output/>
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
                    flex: 1;
                    min-height: 100%;
                }
                
                .content .output-container {
                    flex: 1;
                    min-height: 100%;
                }
            `}</style>
        </Fragment>
    );
}

export default Content;